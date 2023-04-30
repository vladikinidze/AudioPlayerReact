import {useState} from "react";


function UseStyledToggle(ref) {
    const [isOpen, setIsOpen] = useState(false);

    function open(removeClassName = '', addClassName = '') {
        setIsOpen(true);
        if (addClassName && removeClassName) {
            ref.current.classList.remove(removeClassName);
            ref.current.classList.add(addClassName);
        }
    }

    function close(addClassName = '', removeClassName = '') {
        setIsOpen(false);
        if (addClassName && removeClassName) {
            ref.current.classList.remove(removeClassName);
            ref.current.classList.add(addClassName);
        }
    }

    return {
        isOpen,
        open,
        close
    }
}

export default UseStyledToggle;