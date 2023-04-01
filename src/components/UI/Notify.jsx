import {useImperativeHandle, useRef, useState, forwardRef} from "react";

function Notify(_, ref) {
    const [opacityClass, setOpacityClass] = useState('opacity-0');
    const [message, setMessage] = useState('');

    const hideTimer = useRef(null);

    useImperativeHandle(ref, () => ({
        show: (message) => {
            clearTimeout(hideTimer.current);
            setOpacityClass('opacity-1');
            setMessage(message);
            hideTimer.current = setTimeout(() => setOpacityClass('opacity-0'), 2500);

        },
    }));

    return (
        <div
            className={`fixed left-1/2 bottom-28 -translate-x-1/2 z-30 bg-[#2e76d0] text-white tracking-wide whitespace-nowrap rounded-lg shadow-3xl py-3 px-8 pointer-events-none transition-opacity duration-700 ${opacityClass}`}>
            {message}
        </div>
    );
}

export default forwardRef(Notify);