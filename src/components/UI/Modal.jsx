import {forwardRef, useEffect, useRef} from "react";
import useEvent from "../../hooks/useEvent";
import {HiXMark} from "react-icons/hi2";
import useScrollbar from "../../hooks/useScrollbar";

function Modal({onClose, onOpen, children, title, contentRef, animate}, ref) {
    const scrollWrapperRef = useRef();
    useScrollbar(scrollWrapperRef);
    useEffect(() => {
        setTimeout(animate);
    });

    useEvent('keydown', escHandle);

    function escHandle({key}) {
        if (key === 'Escape') {
            onClose();
        }
    }

    return (
        <div
            className="text-white fixed inset-0 bg-black/70 z-40 flex justify-center items-center opacity-0 transition-opacity duration-500"
            role="dialog"
            ref={ref}>
            <div
                className="flex flex-col relative bg-[#333] pb-5 w-[480px] max-h-[700px] rounded-xl -translate-y-10 transition-transform duration-500"
                onClick={(event) => event.stopPropagation()}
                ref={contentRef}>
                <button className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
                        onClick={onClose}>
                    <HiXMark className="h-8 w-8 fill-[#A9A9A9] hover:fill-[#808080]"/>
                </button>
                <h1 className="text-2xl min-h-[55px] pt-5 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600">
                    {title}
                </h1>
                <div ref={scrollWrapperRef}>
                    <div className="py-6 px-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(Modal);