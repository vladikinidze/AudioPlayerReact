import {useRef, useState} from "react";
import usePosition from "./useContextMenuPosition";
import useAwayClick from "./useAwayClick";
import useEvent from "./useEvent";

function useContextMenu(items) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const updateClickCoordinates = usePosition(ref, isOpen)

    useAwayClick(ref, close, isOpen)
    useEvent('keydown', escDownHandle, isOpen)

    function escDownHandle(event) {
        if (event.keyCode === 27) {
            close();
        }
    }

    function open(event) {
        event.preventDefault();
        updateClickCoordinates(event.clientX, event.clientY);
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    return {
        close,
        open,
        isOpen,
        ref,
        items
    }

}

export default useContextMenu;