import {useRef} from "react";

function Input({type, className, children: icon}) {
    const inputRef = useRef();
    return (
        <div className={`flex flex-row justify-center items-center bg-[#272727] hover:bg-[#383838] ${className}`}>
            <input ref={inputRef}
                   type="password"
                   className="grow py-2 px-3 text-base bg-transparent text-[#cccccc] outline-none"/>
            <div className="mr-2.5">
                {icon}
            </div>
        </div>
    );
}

export default Input;