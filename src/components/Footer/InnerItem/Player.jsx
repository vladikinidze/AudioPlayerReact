import Range from "../../UI/Range/Range";
import {PlayCircleIcon, ForwardIcon, BackwardIcon, ArrowPathRoundedSquareIcon} from "@heroicons/react/24/solid";
import ShuffleIcon from "./ShuffleIcon";
import useRange from "../../../hooks/useRange";

function Player({className}) {
    useRange();
    return (
        <div className={`${className} flex flex-col grow max-w-screen-lg`}>
            <div className="grow flex flex-row items-center justify-center mb-2">
                <ShuffleIcon className="w-4 h-4 mx-2.5 hover:fill-[#1cb955]"/>
                <BackwardIcon className="w-5 h-6 mx-2 hover:fill-[#1cb955]"/>
                <PlayCircleIcon className="w-10 h-10 hover:fill-[#1cb955]"/>
                <ForwardIcon className="w-5 h-6 mx-2 hover:fill-[#1cb955]"/>
                <ArrowPathRoundedSquareIcon className="w-5 h-5 mx-2 hover:fill-[#1cb955]"/>
            </div>
            <div className="grow flex flex-row items-center">
                <p className="text-[10.5px] ml-2 mr-4 mt-0.5 font-light text-[#b3b3b3]">0:00</p>
                <Range className="w-full"/>
                <p className="text-[10.5px] ml-4 mr-2 mt-0.5 font-light text-[#b3b3b3]">0:00</p>
            </div>
        </div>
    );
}

export default Player;