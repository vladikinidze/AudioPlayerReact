import ContextMenu from "./ContextMenu";
import {useRef} from "react";
import useSubMenu from "../../hooks/useContextSubMenu";
import {BsChevronRight} from "react-icons/bs";

function ContextMenuItem({subMenuItems, children: text, onClick: clickHandler, onMouseEnter: closeOpenedPreviousSubmenu}) {
    const ref = useRef(null);
    const subMenu = useSubMenu(ref, subMenuItems, closeOpenedPreviousSubmenu)
    let bgClass = subMenu.isOpen ? 'bg-[#3e3e3e]' : 'hover:bg-[#3e3e3e]';

    function onClickHandle(event) {
        event.preventDefault();
        event.stopPropagation();
        clickHandler();
    }

    if (subMenuItems) {
        return (
            <li className="relative"
                onMouseEnter={subMenu.open}
                ref={ref}
                onClick={onClickHandle}>
                <button
                    className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}>
                    {text}
                    <BsChevronRight className="h-4 w-4"/>
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
                onClick={clickHandler}>
                <button className={`w-full p-3 text-left hover:text-white cursor-default ${bgClass}`}>
                    {text}
                </button>
            </li>
        </>
    );
}

export default ContextMenuItem;