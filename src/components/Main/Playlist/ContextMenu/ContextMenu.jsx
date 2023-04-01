import {forwardRef} from "react";
import ContextMenuItem from "./ContextMenuItem";

function ContextMenu({classNames, menuItems}, ref) {
    let closePreviousSubmenu = null;

    function closeOpenedPreviousSubmenu(closeSubmenu = null) {
        if (closePreviousSubmenu) {
            closePreviousSubmenu();
        }
        closePreviousSubmenu = closeSubmenu;
    }

    return (
        <ul className={classNames} ref={ref}>
            {menuItems.map(({text, action, subMenuItems}) => (
                <ContextMenuItem key={text}
                                 subMenuItems={subMenuItems}
                                 onClick={action}
                                 onMouseEnter={closeOpenedPreviousSubmenu}>
                    {text}
                </ContextMenuItem>
            ))}
        </ul>
    );
}

export default forwardRef(ContextMenu);