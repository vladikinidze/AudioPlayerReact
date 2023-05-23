import {useRef} from "react";

function Input({type, className, placeHolder, onInput, children: icon}) {
    const inputRef = useRef();
    return (
        <div className={`flex flex-row justify-center bg-[#181818] items-center ${className}`}>
            <input ref={inputRef}
                   type={type}
                   onInput={(event) => onInput(event.target.value)}
                   placeholder={placeHolder}
                   className="grow py-2 px-3 text-lg bg-transparent text-[#cccccc] outline-none"/>
            <div className="mr-2.5">
                {icon}
            </div>
        </div>
    );
}

export default Input;