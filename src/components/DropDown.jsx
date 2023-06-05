import Image from "./UI/Image";
import {useRef, useState} from "react";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import useAwayClick from "../hooks/useAwayClick";
import useEvent from "../hooks/useEvent";
import {TbDotsVertical} from "react-icons/tb";
import FileService from "../API/FileService";

function DropDown({text, image, items, classname}) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef();
    useAwayClick(contentRef, () => setIsOpen(false), isOpen);
    useEvent('keydown', escHandle);

    function escHandle({key}) {
        if (key === 'Escape') {
            setIsOpen(false);
        }
    }

    return (
        <div className={`relative flex flex-col items-center ${classname}`}>
            <button
                className={`${isOpen ? "pointer-events-none" : "pointer-events-auto"} outline-none bg-[#484848] px-4 py-2 w-full flex items-center justify-between font-bold text-base rounded-full text-white tracking-wider hover:bg-[#686868]`}
                onClick={() => setIsOpen(prev => !prev)}>
                <div className="flex flex-row items-center">
                    <Image className="rounded-full w-[30px] -ml-1 mr-3"
                           url={FileService.getFile(image)}/>
                    <p className="truncate max-w-[150px]">{text}</p>
                </div>
                {isOpen
                    ? <AiFillCaretUp className="h-4 w-4 hover:fill-[#1cb955]"/>
                    : <AiFillCaretDown className="h-4 w-4 hover:fill-[#1cb955]"/>
                }
            </button>

            {isOpen && (
                <div ref={contentRef}
                     className={`absolute bg-[#484848] top-16 flex flex-col items-start w-full rounded overflow-hidden`}>
                    {items.map((item, index) => (
                        <button key={index}
                                onClick={() => {
                                    item.action();
                                    setIsOpen(false);
                                }}
                                className={`w-full m-0 py-3 px-4 hover:bg-[#686868] hover:text-[#1cb955] flex flex-row items-center justify-start tracking-wide font-medium text-white text-base ${index === items.length - 1 ? "" : "border-b border-[#686868]"}`}>
                            {item.icon}
                            {item.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropDown;