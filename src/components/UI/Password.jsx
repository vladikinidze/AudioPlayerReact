import {useRef, useState} from 'react';
import {VscEye, VscEyeClosed} from "react-icons/vsc";

function Password({className, value, placeholder, onInput}) {
    const [isVisible, setIsVisible] = useState(true);
    const inputRef = useRef();
    function onClicked() {
        setIsVisible(!isVisible);
        inputRef.current.type = isVisible ? "text" : "password";
    }

    return (
        <div className={`flex flex-row justify-center items-center bg-[#181818] ${className}`}>
            <input ref={inputRef}
                   placeholder={placeholder}
                   value={value}
                   onInput={(event) => onInput(event.target.value)}
                   type="password"
                   className="placeholder:text-[#a9a9a9] grow py-2 px-3 text-lg bg-transparent text-[#cccccc] outline-none"/>
            <div onClick={onClicked} className="mr-2.5">
                {isVisible
                    ? <VscEyeClosed className="w-7 h-7 hover:fill-[#1cb955]"/>
                    : <VscEye className="w-7 h-7 hover:fill-[#1cb955]"/>
                }
            </div>
        </div>
    );
}

export default Password;