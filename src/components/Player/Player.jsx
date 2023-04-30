import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import useRange from "../../hooks/useRange";
import {FaBars} from "react-icons/fa";
import CurrentTrackInfo from "./CurrentTrackInfo";
import Buttons from "./Buttons";
import TrackProgress from "./TrackProgress";
import Volume from "./Volume";

import piro from '../../../src/components/Main/piro.jpg'
import pirotrack from "../../Pyrokinesis.mp3"

import {
    PAUSE,
    PLAY,
    SET_ARTIST,
    SET_CURRENT_IMAGE,
    SET_CURRENT_TIME,
    SET_DURATION,
    SET_TITLE,
    SET_VOLUME
} from "../../actions/playerActions";

let audio;

function Player() {
    const trackProgressRef = useRef();
    const trackProgress = useRange(trackProgressRef, 0);
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);
    const buttonsClasses = "w-4.75 h-4.75 ml-3 fill-[#b3b3b3] hover:fill-[#1cb955]";

    useEffect(() => {
        if (!audio) {
            audio = new Audio(pirotrack);
            dispatch({type: SET_CURRENT_IMAGE, payload: piro})
            dispatch({type: SET_ARTIST, payload: "pirokinesis"})
            dispatch({type: SET_TITLE, payload: "АЛЬМА-МАТЕР"})
        }

        function onLoadedMetadataHandle() {
            dispatch({type: SET_DURATION, payload: audio.duration})
        }

        function onTimeUpdateHandle() {
            setCurrentTime(audio.currentTime);
        }

        audio.addEventListener('loadedmetadata', onLoadedMetadataHandle);
        audio.addEventListener('timeupdate', onTimeUpdateHandle);
        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadataHandle);
            audio.removeEventListener('timeupdate', onTimeUpdateHandle);
        }
    })

    function setVolume(volume) {
        dispatch({type: SET_VOLUME, payload: volume})
        audio.volume = volume / 100;
    }

    function setCurrentTime(time) {
        if (audio && audio.currentTime) {
            if (Math.abs(time - audio.currentTime) > 1) {
                audio.currentTime = Number(time);
            }
        }
        dispatch({type: SET_CURRENT_TIME, payload: Number(time)})
    }

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
        <div
            className="bg-[#181818] border-t border-solid border-[#484848] z-40 text-white pb-3 pt-2.5 px-6 flex justify-between items-center flex-wrap gap-x-6 gap-y-2">
            <CurrentTrackInfo image={player.image}
                              title={player.title}
                              artist={player.artist}/>
            <div className={`flex flex-col grow max-w-screen-lg`}>
                <Buttons play={play}
                         isPlaying={player.pause}/>
                <TrackProgress ref={trackProgressRef}
                               audio={audio}
                               setValue={setCurrentTime}
                               trackProgress={trackProgress}/>
            </div>
            <div className="flex flex-row items-center w-[250px] p-3">
                <FaBars className={`${buttonsClasses}`}/>
                <Volume setVolume={setVolume}/>
            </div>
        </div>
    )
}

export default Player;
