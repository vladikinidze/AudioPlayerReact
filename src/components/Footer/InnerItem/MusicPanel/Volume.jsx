import {SpeakerWaveIcon, SpeakerXMarkIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

function Volume({value, active, setActive, setVolume}) {

    const [previousVolume, setPreviousVolume] = useState(value);
    function changeVolume(on) {
        if (on) {
            setPreviousVolume(value);
        }
        setVolume(on ? previousVolume : 0);
        setActive(on);
    }

    if (active) {
        return (
            <SpeakerWaveIcon onClick={() => changeVolume(false)} className="w-5 h-5 hover:stroke-[#1cb955] ml-5 mr-3"/>
        );
    }

    return (
        <SpeakerXMarkIcon onClick={() => changeVolume(true)} className="w-5 h-5 hover:stroke-[#1cb955] ml-5 mr-3"/>
    );


}

export default Volume;