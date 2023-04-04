import {useState} from "react";


function UseStyledToggle(ref) {
    const [isOpen, setIsOpen] = useState(false);

    function open(removeClassName = '', addClassName = '') {
        setIsOpen(true);
        ref.current.classList.remove(removeClassName);
        ref.current.classList.add(addClassName);

    }

    function close(addClassName = '', removeClassName = '') {
        setIsOpen(false);
        ref.current.classList.remove(removeClassName);
        ref.current.classList.add(addClassName);

    }

    return {
        isOpen,
        open,
        close
    }
}

export default UseStyledToggle;