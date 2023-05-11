import React, {forwardRef, useEffect} from 'react';
import Menu from "./Menu/Menu";
import Logo from "./Logo";
import {MIN_DESKTOP_WIDTH} from "../../utils";


function Sidebar({showPopup, sidebarToggle, modal, isOpen, close}, ref) {
    useEffect(() => {
        function onResizeHandle() {
            if (window.innerWidth <= MIN_DESKTOP_WIDTH && isOpen) {
                console.log(1)
                close();
            }
        }
        window.addEventListener('resize', onResizeHandle);
        return () => {
            window.removeEventListener('resize', onResizeHandle)
        }
    })
    return (
        <>
            <aside ref={ref} id="sidebar" className={`bg-neutral-950 w-[270px] min-w-[270px] text-gray-100 overflow-hidden flex flex-col fixed sidebarHide:sticky top-0 z-30
                       h-screen sidebarHide:h-auto sidebarHide:translate-x-0 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Logo/>
                <Menu showPopup={showPopup}
                      modal={modal}
                      sidebarToggle={sidebarToggle}/>
            </aside>
        </>
    );
}

export default forwardRef(Sidebar);