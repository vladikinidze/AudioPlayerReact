import {forwardRef} from 'react';
import Menu from "./Menu/Menu";
import Logo from "./Logo";
import {MIN_DESKTOP_WIDTH} from "../../utils";
import useEvent from "../../hooks/useEvent";
import Footer from "./Footer/Footer";


function Sidebar({showPopup, sidebarToggle, modal}, ref) {
    useEvent("resize", onResizeHandle, true, window);
    function onResizeHandle() {
        if (window.innerWidth <= MIN_DESKTOP_WIDTH && sidebarToggle.isOpen) {
            sidebarToggle.close();
        }
    }
    return (
        <>
            <aside ref={ref} className={`bg-neutral-950 w-[270px] min-w-[270px] text-gray-100 overflow-hidden flex flex-col fixed sidebarHide:sticky top-0 z-30
                       h-screen sidebarHide:h-auto sidebarHide:translate-x-0 transition-transform ${sidebarToggle.isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Logo/>
                <Menu showPopup={showPopup}
                      modal={modal}
                      sidebarToggle={sidebarToggle}/>
                <Footer modal={modal} />
            </aside>
        </>
    );
}

export default forwardRef(Sidebar);