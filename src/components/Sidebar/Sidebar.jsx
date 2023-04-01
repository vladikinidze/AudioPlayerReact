import React from 'react';
import Logo from "./Logo";
import Menu from "./Menu/Menu";
import Footer from "./Footer/Footer";

function Sidebar({showPopup}) {
    return (
        <aside id="sidebar" className="bg-neutral-950 w-[270px] text-gray-100 overflow-hidden flex flex-col fixed sidebarHide:sticky top-0 z-30
                       h-screen sidebarHide:h-auto -translate-x-full target:translate-x-0 sidebarHide:translate-x-0 transition-transform peer">
            <Logo/>
            <Menu showPopup={showPopup}/>
            {/*<Footer/>*/}
        </aside>
    );
}

export default Sidebar;