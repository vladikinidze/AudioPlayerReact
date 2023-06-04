import {useEffect, useRef, useState} from "react";

function Input({type, className, placeHolder, onInput, value, children: icon}) {
    //const [input, setInput] = useState(value ?? "");
    const inputRef = useRef();

    useEffect(() => {
        // setInput(value);
        inputRef.current.value = value;
    },[value])
    function onChanged(event) {
        // setInput(event.target.value)
        onInput(event.target.value)
    }
    return (
        <div className={`flex flex-row justify-center bg-[#181818] items-center ${className}`}>
            <input ref={inputRef}
                   type={type}
                   value={value ?? ""}
                   onInput={onChanged}
                   placeholder={placeHolder}
                   className="placeholder:text-[#a9a9a9] grow py-2 px-3 text-lg bg-transparent text-[#cccccc] outline-none"/>
            <div className="mr-2.5">
                {icon}
            </div>
        </div>
    );
}

export default Input;