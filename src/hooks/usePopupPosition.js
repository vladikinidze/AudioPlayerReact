import {debounce, MIN_DESKTOP_WIDTH} from "../utils";
import {useRef, useState} from "react";
import useEvent from "./useEvent";


function UsePopupPosition(ref, changeScreenCallback) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < MIN_DESKTOP_WIDTH);
    const [target, setTarget] = useState();
    const changeWidthTimer = useRef();

    function resizeHandle() {
        if (!(isCurrentWindowSmall() && !isSmallScreen) &&
            !(isCurrentWindowBig() && isSmallScreen)) {
            return;
        }
        changeScreenCallback();
        clearTimeout(changeWidthTimer.current);
        changeWidthTimer.current = setTimeout(
            () => setIsSmallScreen(isCurrentWindowSmall),
            500);
    }
    const debounceResize = debounce.bind(null, resizeHandle, 500);

    useEvent('resize', debounceResize, true, window)
    function isCurrentWindowSmall() {
        return window.innerWidth < MIN_DESKTOP_WIDTH;
    }

    function isCurrentWindowBig() {
        return window.innerWidth >= MIN_DESKTOP_WIDTH;
    }

    function move(target, offset) {
        offset = offset || calculateTargetOffset(target);
        ref.current.style.top = `${offset.top}px`;
        ref.current.style.left = `${offset.left}px`;
        setTarget(target);
    }

    function calculateTargetOffset(target) {
        const {top, right, left, height} = target.getBoundingClientRect();
        return {
            top: isSmallScreen ? top + height * 2 : top - (height / 4.5) * 2,
            left: isSmallScreen ? left : right + 30,
        }
    }

    return {
        move,
        target,
        setTarget,
        isSmallScreen
    };
}

export default UsePopupPosition;