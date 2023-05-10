import {useRef, useState} from 'react';
import {VscEye, VscEyeClosed} from "react-icons/vsc";

function Password({className}) {

    const [isVisible, setIsVisible] = useState(false);
    const inputRef = useRef();
    function onClicked() {
        setIsVisible(!isVisible);
        inputRef.current.type = isVisible ? "text" : "password";
    }

    return (
        <div className={`flex flex-row justify-center items-center bg-[#272727] hover:bg-[#383838] ${className}`}>
            <input ref={inputRef}
                   type="password"
                   className="grow py-2 px-3 text-base bg-transparent text-[#cccccc] outline-none"/>
            <div onClick={onClicked} className="mr-2.5">
                {isVisible
                    ? <VscEyeClosed className="w-7 h-7"/>
                    : <VscEye className="w-7 h-7"/>
                }
            </div>

        </div>
    );
}

export default Password;