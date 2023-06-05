import {useRef, useState} from "react";
import {BsSearch} from "react-icons/bs";
import {HiOutlineXMark} from "react-icons/hi2";
import {reactRoot} from "../../API/Path/path";

function SearchInput({className, onInput}) {
    const inputRef = useRef();
    const [isInput, setIsInput] = useState(false);

    function onDivClicked() {
        inputRef.current?.focus();
    }
    function onButtonClicked() {
        inputRef.current.value = "";
        onInput("");
        setIsInput(false);
    }
    function onInputed(event) {
        onInput(event.target.value);
        setIsInput(true);
        if (window.location.href !== reactRoot + "/search") {
            document.querySelector('nav a:nth-child(2)').click();
        }
    }

    return (
        <div
            className={`flex flex-row justify-between items-center font-semibold leading-6 tracking-widest py-[7px] px-[13px] rounded-full cursor-text w-[280px] bg-white ${className}`}
            onClick={onDivClicked}>
            <BsSearch className="w-4.75 h-4.75 mr-2"/>
            <input onInput={onInputed}
                   ref={inputRef}
                   placeholder="Плейлист или трек"
                   type="text"
                   className="grow outline-none"/>
            {isInput && inputRef.current?.value !== "" &&
                <button onClick={onButtonClicked}>
                    <HiOutlineXMark className="h-6 w-6 ml-2 -mr-0.5 stroke-black hover:stroke-[#1cb955]"/>
                </button>}
        </div>
    );
}

export default SearchInput;