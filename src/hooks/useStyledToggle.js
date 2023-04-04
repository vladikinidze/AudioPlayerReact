import {useState} from "react";


function UseStyledToggle(ref) {
    const [isOpen, setIsOpen] = useState(true);

    function open(removeClassName = '', addClassName = '') {
        setIsOpen(true);
        ref.current.classList.remove(removeClassName);
        ref.current.classList.add(addClassName);

    }

    function close(aadClassName = '', removeClassName = '') {
        setIsOpen(false);
        ref.current.classList.remove(removeClassName);
        ref.current.classList.add(aadClassName);

    }

    return {
        isOpen,
        open,
        close
    }
}

export default UseStyledToggle;