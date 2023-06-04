import {useState} from "react";

function UseModal(ref, contentRef) {
    const [isOpen, setIsOpen] = useState();
    const [content, setContent] = useState();
    function open(children) {
        setContent(children);
        setIsOpen(true);
    }

    function close() {
        animate(true);
        setTimeout(() => setIsOpen(false), 500)
    }

    function animate(isClosing = false) {
        ref.current?.classList.toggle('opacity-0', isClosing);
        contentRef.current?.classList.toggle('-translate-y-10', isClosing);
    }

    return {
        content,
        open,
        close,
        isOpen,
        ref,
        contentRef,
        animate
    };
}
export default UseModal;