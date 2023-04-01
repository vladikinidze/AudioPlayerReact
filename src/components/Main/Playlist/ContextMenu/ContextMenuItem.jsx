import {ChevronRightIcon} from "@heroicons/react/outline";
import ContextMenu from "./ContextMenu";
import {useRef} from "react";
import useSubMenu from "../../../../hooks/useContextSubMenu";

function ContextMenuItem({
                             subMenuItems,
                             children: text,
                             onClick: clickHandle,
                             onMouseEnter: closeOpenedPreviousSubmenu
                         }) {
    const ref = useRef(null);
    const subMenu = useSubMenu(ref, subMenuItems, closeOpenedPreviousSubmenu)
    let bgClass = subMenu.isOpen ? 'bg-[#3e3e3e]' : 'hover:bg-[#3e3e3e]';

    if (subMenuItems) {
        return (
            <li className="relative"
                onMouseEnter={subMenu.open}
                ref={ref}
                onClick={clickHandle}>
                <button
                    className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}>
                    {text}
                    <ChevronRightIcon className="h-4 w-4"/>
                </button>
                {subMenu.isOpen && (
                    <ContextMenu menuItems={subMenu.items}
                                 classNames={`absolute bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default ${subMenu.positionClassNames}`}/>
                )}
            </li>
        );
    }

    return (
        <>
            <li onMouseEnter={() => closeOpenedPreviousSubmenu()}
                onClick={clickHandle}>
                <button className={`w-full p-3 text-left hover:text-white cursor-default ${bgClass}`}>
                    {text}
                </button>
            </li>
        </>
    );
}

export default ContextMenuItem;