import React from 'react';
import piro from "../../Main/piro.jpg";
import {HeartIcon} from "@heroicons/react/24/outline";

function CurrentTrackInfo() {
    return (
        <div className="flex flex-row items-center w-[250px]">
            <img src={piro} className="w-[65px] h-[65px] rounded-sm mt-0.5" alt=""/>
            <div className="flex flex-col mx-5 justify-center">
                <p className="text-sm font-semibold text-white mb-px">
                    Веснушки
                </p>
                <p className="text-xs font-light text-[#b3b3b3]">
                    Pyrokinesis
                </p>
            </div>
            <HeartIcon className="w-6 h-6 hover:stroke-[#1cb955]"/>
        </div>
    );
}

export default CurrentTrackInfo;