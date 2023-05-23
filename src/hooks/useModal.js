import {useState} from "react";

function UseModal() {
    const [isOpen, setIsOpen] = useState();
    const [content, setContent] = useState();
    function open(children) {
        setContent(children);
        setIsOpen(true);
    }
    function close() {
        setIsOpen(false);
    }
    return {
        content,
        open,
        close,
        isOpen
    };
}
export default UseModal;