import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FaBars} from "react-icons/fa";
import {ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute2} from "react-icons/im";
import {PAUSE, PLAY, SET_CURRENT_TIME, SET_DURATION} from "../../actions/playerActions";
import CurrentTrackInfo from "./CurrentTrackInfo";
import Buttons from "./Buttons";
import Range from "../UI/Range/Range"

import pirotrack from "../../Pyrokinesis.mp3"
import piro from "../Main/piro.jpg"

const track = {
    title: "Альма-матер",
    artist: "pyrokonesis",
    trackUrl: pirotrack,
    imageUrl: piro,
    duration: "148"
}

let audio;

function Player() {
    const dispatch = useDispatch();
    const player = useSelector(state => state.player)
    const buttonsClasses = "w-4.75 h-4.75 fill-[#b3b3b3] hover:fill-[#1cb955]";

    const [volume, setVolume] = useState(100);

    function setTrackProgress(number) {
        audio.currentTime = number;
    }

    useEffect(() => {
        if (!audio) {
            audio = new Audio(track.trackUrl);
        }

        function onLoadedMetadataHandle(e) {
            dispatch({type: SET_DURATION, payload: audio.duration})
        }

        audio.addEventListener('loadedmetadata', onLoadedMetadataHandle);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadataHandle);
        }
    })

    function play() {
        if (player.pause) {
            dispatch({type: PLAY});
            audio.play();
        } else {
            dispatch({type: PAUSE});
            audio.pause();
        }
    }

    return (
        <div className="bg-[#181818] border-t border-solid border-[#484848] z-40 text-white pb-3 pt-2.5 px-6 flex justify-between items-center flex-wrap gap-x-6 gap-y-2">
            <CurrentTrackInfo/>
            <div className={`flex flex-col grow max-w-screen-lg`}>
                <Buttons play={play} isPlaying={player.pause}/>
                <Range/>
            </div>
            <div className="flex flex-row items-center w-[250px] p-3">
                <FaBars className={`${buttonsClasses} mr-2`}/>
                <div className="w-[20px] ml-4 mr-2">
                    {volume > 70
                        ? <ImVolumeHigh className={`${buttonsClasses}`}/>
                        : volume > 40
                            ? <ImVolumeMedium className={`${buttonsClasses}`}/>
                            : volume > 0
                                ? <ImVolumeLow className={`${buttonsClasses}`}/>
                                : <ImVolumeMute2 className={`${buttonsClasses}`}/>
                    }
                </div>
                <Range className="grow"/>
            </div>
        </div>
    )
        ;
}

export default Player;
