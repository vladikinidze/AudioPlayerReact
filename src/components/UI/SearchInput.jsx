import {useRef, useState} from "react";
import {BsSearch} from "react-icons/bs";
import {RxCross1} from "react-icons/rx";

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
        if (window.location.href !== "http://localhost:3000/search") {
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
            {isInput &&
                <button onClick={onButtonClicked}>
                    <RxCross1 className="h-4 w-4 ml-2 fill-[#A8A8A8] hover:fill-black"/>
                </button>}
        </div>
    );
}

export default SearchInput;