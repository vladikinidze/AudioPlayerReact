import {useLayoutEffect} from "react";

let clickPosition = {x: null, y: null};

function useContextMenuPosition(ref, isOpen) {
    useLayoutEffect(() => {
        if (isOpen) {
            updatePosition();
        }
    })

    function updatePosition() {
        updateVerticalPosition();
        updateHorizontalPosition();
    }

    function updateHorizontalPosition() {
        const menuWidth = ref.current.offsetWidth;
        const x = clickPosition.x;
        ref.current.style.left = `${menuWidth > window.innerWidth - x ? x - menuWidth : x}px`
    }

    function updateVerticalPosition() {
        const menuHeight = ref.current.offsetHeight;
        const y = clickPosition.y;
        ref.current.style.top = `${menuHeight > window.innerHeight - y ? y - menuHeight : y}px`
    }

    function updateClickCoordinates(x, y) {
        clickPosition.x = x;
        clickPosition.y = y;
    }
    return updateClickCoordinates;
}

export default useContextMenuPosition;