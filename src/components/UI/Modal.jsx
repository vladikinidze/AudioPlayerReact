import {XMarkIcon} from "@heroicons/react/24/outline";
import {useEffect, useRef} from "react";
import useEvent from "../../hooks/useEvent";


function Modal({onClose: closeHandle, children: text}) {
    const ref = useRef();
    const contentRef = useRef();
    useEffect(() => {
        setTimeout(animate);
    });

    useEvent('keydown', escHandle);

    function escHandle({key}) {
        if (key === 'Escape') {
            close();
        }
    }

    function close() {
        animate(true);
        setTimeout(closeHandle, 500)
    }

    function animate(isClosing = false) {
        ref.current.classList.toggle('opacity-0', isClosing);
        contentRef.current.classList.toggle('-translate-y-10', isClosing);
    }

    return (
        <div className="text-white fixed inset-0 bg-black/70 z-30 flex justify-center items-center opacity-0 transition-opacity duration-500"
            role="dialog"
            ref={ref}
            onClick={close}>
            <div className="flex flex-col relative bg-[#333] pb-5 h-80 w-[480px] rounded-xl -translate-y-10 transition-transform duration-500"
                onClick={(event) => event.stopPropagation()}
                ref={contentRef}>
                <button className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
                        onClick={close}>
                    <XMarkIcon className="h-8 w-8"/>
                </button>
                <h1 className="text-3xl pt-5 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600">
                    Заголовок
                </h1>
                <div className="py-6 px-8 overflow-y-auto">
                    {text}
                </div>
            </div>
        </div>
    );
}

export default Modal;