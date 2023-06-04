import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import {useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';

function TextArea({className, text, onChanged, placeHolder}) {
    const [isOpen, setIsOpen] = useState(false);
    const [area, setArea] = useState(text ?? undefined);
    const areaRef = useRef();

    function onInput(event) {
        onChanged(event.target.value)
    }

    function onClick() {
        setIsOpen(prev => !prev)
        setTimeout(() => {
            if (areaRef.current) {
                areaRef.current?.focus();
            }
        }, 100)
    }

    return (
        <div className="w-full">
            <button
                className={`bg-[#181818] flex hover:text-[#1cb955] flex-row justify-between items-center py-2 px-3 text-lg text-[#cccccc] ${isOpen ? "rounded-t" : "rounded"} outline-none ${className}`}
                onClick={onClick}>
                <p className="text-lg text-[#a9a9a9] pointer-events-none tracking-wide">{placeHolder}</p>
                {isOpen
                    ? <AiFillCaretUp className="h-4 w-4"/>
                    : <AiFillCaretDown className="h-4 w-4"/>
                }
            </button>
            <TextareaAutosize ref={areaRef}
                              value={area}
                              className={`bg-[#181818] ${isOpen ? "" : "hidden"} resize-none -mt-6 grow py-2 px-3 text-lg text-[#cccccc] rounded-b outline-none ${className}`}
                              onInput={onInput}/>
        </div>
    );
}

export default TextArea;