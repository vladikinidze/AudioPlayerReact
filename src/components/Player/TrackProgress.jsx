import Range from 'react-range-progress';
import {
    PlayCircleIcon,
    ForwardIcon,
    BackwardIcon,
    ArrowPathRoundedSquareIcon
} from "@heroicons/react/24/solid";
import ShuffleIcon from "../UI/ShuffleIcon";
import {useState} from "react";


function TrackProgress({className}) {
    const [value, setValue] = useState(0);
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
                <div className="w-full">
                    <Range value={value}
                           thumbSize={10}
                           height={5}
                           width="100%"
                           onChange={val => setValue(val)}
                           thumbColor={{
                               r: 28,
                               g: 185,
                               b: 85,
                               a: 1,
                           }}
                           fillColor={{
                               r: 179,
                               g: 179,
                               b: 179,
                               a: 1,
                           }}
                           trackColor={{
                               r: 56,
                               g: 56,
                               b: 56,
                               a: 1,
                           }}
                    />
                </div>
                <p className="text-[10.5px] ml-4 mr-2 mt-0.5 font-light text-[#b3b3b3]">0:00</p>
            </div>
        </div>
    );
}

export default TrackProgress;