import {useRef} from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Main from "./components/Main/ Main";
import Footer from "./components/Footer/Footer";
import Notify from "./components/UI/Notify";
import Popup from "./components/UI/Popup";
import Modal from "./components/UI/Modal";
import useEvent from "./hooks/useEvent";
import useModal from "./hooks/useModal";


//import Footer from "./components/Footer/Footer";

function App() {
    let isScrollingEnabled = true;
    const contentWrapperRef = useRef();
    const notifyRef = useRef();
    const popupRef = useRef();

    useEvent('wheel', scrollHandle, true, () => contentWrapperRef.current)

    const modal = useModal();

    function showNotify(message) {
        notifyRef.current?.show(message);
    }

    function showPopup(title, description, target, offset) {
        popupRef.current?.show(title, description, target, offset);
    }

    function toggleScrolling(isEnabled) {
        isScrollingEnabled = isEnabled;
    }

    function scrollHandle(event) {
        if (isScrollingEnabled) return;
        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <>
            <div className="flex grow overflow-y-auto">
                <Sidebar showPopup={showPopup}/>
                <a href="/"
                   className="fixed inset-0 bg-black opacity-0 peer-target:opacity-50 pointer-events-none peer-target:pointer-events-auto z-20 lg:hidden cursor-default transition-opacity"></a>
                <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
                    <Header/>
                    <Main toggleScrolling={toggleScrolling}
                          showNotify={showNotify}
                          showPopup={showPopup}
                          openModal={modal.open}
                    />
                </div>
            </div>
            <Footer />
            <Notify ref={notifyRef}/>
            <Popup ref={popupRef}/>
            {modal.isOpen && <Modal onClose={modal.close}/>}
        </>
    )
}

export default App;
