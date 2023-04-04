import React, {forwardRef} from 'react';
import Menu from "./Menu/Menu";
import Logo from "./Logo";


function Sidebar({showPopup, isOpen}, ref) {
    return (
        <>
            <aside ref={ref} id="sidebar" className={`bg-neutral-950 w-[270px] min-w-[270px] text-gray-100 overflow-hidden flex flex-col fixed sidebarHide:sticky top-0 z-30
                       h-screen sidebarHide:h-auto sidebarHide:translate-x-0 transition-transform peer ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Logo/>
                <Menu showPopup={showPopup}/>
            </aside>
        </>
    );
}

export default forwardRef(Sidebar);