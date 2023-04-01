import {useEffect, useRef, useState} from "react";

function useContextSubMenu(menuItemRef, items, closeOpenedPreviousSubmenu) {

    const [state, setState] = useState({
        isOpen: false,
        positionClassNames: ''
    });

    const closeTimer = useRef(null);

    function open() {
        closeOpenedPreviousSubmenu(startTimeoutClose);
        setState({
            isOpen: true,
            positionClassNames: getMenuPositionClassNames()
        });
    }

    function close() {
        setState({
            isOpen: false,
            positionClassNames: ''
        });
    }

    function startTimeoutClose() {
        closeTimer.current = setTimeout(close, 200);
    }

    function stopTimeoutClose() {
        clearTimeout(closeTimer.current);
    }

    useEffect(() => stopTimeoutClose);

    function getMenuPositionClassNames() {
        return `${getMenuPositionXClass()} ${getMenuPositionYClass()}`;
    }

    function getMenuPositionXClass() {
        const menuItem = menuItemRef.current;
        const menuItemWidth = menuItem.offsetWidth;
        const windowWidth = window.innerWidth;
        const menuItemRightCoordX = menuItem.getBoundingClientRect().right;

        return menuItemWidth > windowWidth - menuItemRightCoordX
            ? 'right-full'
            : 'left-full';
    }

    function getMenuPositionYClass() {
        const menuItem = menuItemRef.current;
        const menuHeight = menuItem.offsetHeight * items.length;
        const windowHeight = window.innerHeight;
        const menuItemBottomCoordY = menuItem.getBoundingClientRect().bottom;

        return menuHeight > windowHeight - menuItemBottomCoordY
            ? 'bottom-0'
            : 'top-0';
    }

    return {
        open,
        items,
        ...state
    };
}

export default useContextSubMenu;