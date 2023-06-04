import {useEffect, useRef, useState} from "react";
import 'overlayscrollbars/overlayscrollbars.css';
import {BrowserRouter} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Player from "./components/Player/Player";
import Popup from "./components/UI/Popup";
import AppRouter from "./components/AppRouter";
import useEvent from "./hooks/useEvent";
import Notify from "./components/UI/Notify";
import Header from "./components/Header";
import useModal from "./hooks/useModal";
import useAverageBackgroundColor from "./hooks/useAverageBackgroundColor";
import useStyledToggle from "./hooks/useStyledToggle";
import useScrollbar from './hooks/useScrollbar'
import useSearch from "./hooks/useSearch";
import Modal from "./components/UI/Modal";
import useFetching from "./hooks/useFetching";
import {useDispatch, useSelector} from "react-redux";
import {SET_EMAIL, SET_FAVORITE_PLAYLIST, SET_GUID, SET_IMAGE, SET_USERNAME} from "./actions/userActions";
import UserService from "./API/UserService";
import Auth from "./components/Auth";
import {SET_EXPLICIT} from "./actions/appActions";
import player from "./components/Player/Player";

function App() {
    const scrollWrapperRef = useRef();
    const gradientRef = useRef();
    const popupRef = useRef();
    const notifyRef = useRef();
    const contentWrapperRef = useRef();
    const sidebarRef = useRef();
    const modalRef = useRef();
    const track = useSelector(state => state.track);
    const player = useSelector(state => state.player);
    const modalContentRef = useRef();
    const modal = useModal(modalRef, modalContentRef);
    let isScrollingEnabled = true;
    const averageBackgroundColor = useAverageBackgroundColor(gradientRef);
    useEvent('wheel', scrollHandle, true, () => contentWrapperRef.current);
    const sidebarToggle = useStyledToggle(sidebarRef);
    useScrollbar(scrollWrapperRef);
    const search = useSearch();
    const dispatch = useDispatch();

    const [getUserById, isGetUserLoading, getUserError] = useFetching(async () => {
        const response = await UserService.getById(JSON.parse(localStorage.getItem("auth") ?? sessionStorage.getItem("auth")).userId);
        dispatch({type: SET_GUID, payload: response.id});
        dispatch({type: SET_EMAIL, payload: response.email});
        dispatch({type: SET_IMAGE, payload: response.image});
        dispatch({type: SET_USERNAME, payload: response.username});
        dispatch({type: SET_FAVORITE_PLAYLIST, payload: response.favoritePlaylistId});
        const responseSettings = await UserService.getSettings();
        dispatch({type: SET_EXPLICIT, payload: responseSettings.explicit});
    });
    const [refreshToken, isRefreshTokenLoading, refreshTokenError] = useFetching(async () => {
        let storage = localStorage.getItem("auth") ?? sessionStorage.getItem("auth")
        if (storage) {
            storage = JSON.parse(storage);
            const response = await UserService.refreshToken(storage.userId, storage.accessToken, storage.refreshToken);
            if (localStorage.getItem("auth")) {
                localStorage.setItem("auth", JSON.stringify(response));
            } else {
                sessionStorage.setItem("auth", JSON.stringify(response));
            }
        }
    });

    useEffect(() => {
        if (getUserError) {
            if (getUserError.status === 401) {
                refreshToken();
                setTimeout(() => {
                    getUserById();
                }, 300)
            }
        }
    }, [getUserError])

    useEffect(() => {
        if (localStorage.getItem("auth") ?? sessionStorage.getItem("auth")) {
            refreshToken();
            getUserById();
        } else {
            modal.open(<Auth onClose={modal.close} openModal={modal.open}/>)
        }
    }, [])

    useEffect(() => {
        if (refreshTokenError?.error === "Token not expired.") {
            const auth = JSON.parse(localStorage.getItem("auth") ?? sessionStorage.getItem("auth"));
            dispatch({type: SET_GUID, payload: auth?.userId});
            getUserById();
        }
    }, [])

    function scrollHandle(event) {
        if (isScrollingEnabled) return;
        event.preventDefault();
        event.stopPropagation();
    }

    function toggleScrolling(isEnabled) {
        isScrollingEnabled = isEnabled;
    }

    function showPopup(title, description, target, offset) {
        popupRef.current?.show(title, description, target, offset);
    }

    function showNotify(message) {
        notifyRef.current?.show(message);
    }

    return (
        <BrowserRouter>
            <div className="flex flex-col bg-[#121212] overflow-y-hidden">
                <div className="flex h-screen flex-row flex-grow overflow-y-hidden">
                    <Sidebar ref={sidebarRef}
                             showPopup={showPopup}
                             modal={modal}
                             sidebarToggle={sidebarToggle}/>
                    <div
                        className={`fixed inset-0 bg-black opacity-50 pointer-events-auto z-20 sidebarHide:hidden cursor-default transition-opacity ${sidebarToggle.isOpen ? '' : 'hidden'}`}
                        onClick={() => sidebarToggle.close('translate-x-0', '-translate-x-full')}></div>
                    <div className="flex flex-col flex-1 overflow-hidden"
                         ref={contentWrapperRef}>
                        <Header openSidebar={sidebarToggle.open}
                                modal={modal}
                                searchOnInput={search.onSearching}/>
                        <main className="text-white relative overflow-y-hidden h-full" ref={scrollWrapperRef}>
                            <div className="grow h-full" ref={gradientRef}>
                                <AppRouter showPopup={showPopup}
                                           showNotify={showNotify}
                                           averageBackgroundColor={averageBackgroundColor}
                                           searchQuery={search.query}
                                           modal={modal}
                                           toggleScrolling={toggleScrolling}/>
                            </div>

                        </main>
                    </div>
                </div>
                <Player showNotify={showNotify}
                        averageColor={averageBackgroundColor}/>
                <Popup ref={popupRef}
                       closeModal={modal.close}
                       openModal={modal.open}/>
                {modal.isOpen &&
                    <Modal ref={modal.ref}
                           onClose={modal.close}
                           onOpen={modal.open}
                           contentRef={modal.contentRef}
                           animate={modal.animate}>
                        {modal.content}
                    </Modal>
                }
                <Notify ref={notifyRef}/>
            </div>
        </BrowserRouter>
    );
}

export default App;