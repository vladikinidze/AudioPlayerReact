import useEvent from "./useEvent";

function UseAwayClick(ref, handler, shouldHandle = true) {
    useEvent('mousedown', mousedownHandle)

    function mousedownHandle(event) {
        const handle = shouldHandle instanceof Function
            ? shouldHandle(event)
            : shouldHandle;
        if (handle && !ref.current?.contains(event.target)) {
            handler();
        }
    }
}

export default UseAwayClick;