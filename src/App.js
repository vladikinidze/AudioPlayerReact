import {useRef, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Player from "./components/Player/Player";
import Popup from "./components/UI/Popup";
import Modal from "./components/UI/Modal";
import AppRouter from "./components/AppRouter";
import useEvent from "./hooks/useEvent";
import Notify from "./components/UI/Notify";
import Header from "./components/Header";
import useModal from "./hooks/useModal";
import useAverageBackgroundColor from "./hooks/useAverageBackgroundColor";
import useStyledToggle from "./hooks/useStyledToggle";
import useScrollbar from './hooks/useScrollbar'
import 'overlayscrollbars/overlayscrollbars.css';

function App() {
    const scrollWrapperRef = useRef();
    const gradientRef = useRef();
    const popupRef = useRef();
    const notifyRef = useRef();
    const contentWrapperRef = useRef();
    const sidebarRef = useRef();
    const modal = useModal();
    let isScrollingEnabled = true;
    const averageBackgroundColor = useAverageBackgroundColor(gradientRef);
    useEvent('wheel', scrollHandle, true, () => contentWrapperRef.current);
    const sidebarToggle = useStyledToggle(sidebarRef);
    useScrollbar(scrollWrapperRef);

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
                             isOpen={sidebarToggle.isOpen}
                             close={sidebarToggle.close}/>
                    <div
                        className={`fixed inset-0 bg-black opacity-50 pointer-events-auto z-20 sidebarHide:hidden cursor-default transition-opacity ${sidebarToggle.isOpen ? '' : 'hidden'}`}
                        onClick={() => sidebarToggle.close('translate-x-0', '-translate-x-full')}></div>
                    <div className="flex flex-col flex-1 overflow-hidden" ref={contentWrapperRef}>
                        <Header openSidebar={sidebarToggle.open}/>
                        <main className="text-white relative overflow-y-hidden grow h-screen" ref={scrollWrapperRef}>
                            <div ref={gradientRef}
                                className="absolute w-full h-full"></div>
                            <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl h-auto overflow-hidden">
                                <AppRouter showPopup={showPopup}
                                           showNotify={showNotify}
                                           averageBackgroundColor={averageBackgroundColor}
                                           modal={modal}
                                           toggleScrolling={toggleScrolling}/>
                            </div>
                        </main>
                    </div>
                </div>
                <Player/>
                <Popup ref={popupRef}/>
               {modal.isOpen && <Modal onClose={modal.close}/>}
                <Notify ref={notifyRef}/>
            </div>
        </BrowserRouter>
    );
}

export default App;