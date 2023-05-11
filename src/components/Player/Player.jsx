import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useRange from "../../hooks/useRange";
import {FaBars} from "react-icons/fa";
import CurrentTrackInfo from "./CurrentTrackInfo";
import Buttons from "./Buttons";
import TrackProgress from "./TrackProgress";
import Volume from "./Volume";
import {
    PAUSE,
    PLAY,
    SET_CURRENT_TIME,
    SET_DURATION,
    SET_VOLUME
} from "../../actions/playerActions";
import useFetching from "../../hooks/useFetching";
import useAwayClick from "../../hooks/useAwayClick";
import PlaylistService from "../../API/PlaylistService";
import UserService from "../../API/UserService";

let audio;
let playlist;
let userDto;

function Player() {
    const trackProgressRef = useRef();
    const trackProgress = useRange(() => trackProgressRef);
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);
    const track = useSelector(state => state.track);
    const buttonsClasses = "w-4.75 h-4.75 ml-3 fill-[#b3b3b3] hover:fill-[#1cb955]";

    const [image, setImage] = useState();
    const [user, setUser] = useState();

    const [fetchPlaylist, isLoading, error] = useFetching(async () => {
        playlist = await PlaylistService.getById(player.active.parentPlaylistId);
        setUser(playlist.user)
        setImage(playlist.image);
    });

    function setAudio() {
        if (player.active) {
            audio.preload = "metadata";
            audio.crossOrigin = "anonymous";
            audio.src = `https://localhost:7182/api/files/${player.active.audio}`
            audio.play();
            fetchPlaylist();
            audio.onloadeddata = () => {
                dispatch({type: SET_DURATION, payload: audio.duration})
            }
            audio.ontimeupdate = () => {
                setCurrentTime(audio.currentTime);
            }

        }
    }

    useEffect(() => {
        if (audio) {
            if (player.pause) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [player.pause])

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        } else {
            setAudio();
        }
    }, [player.active])

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

    useEffect(() => {
        if (player.pause) {
            dispatch({type: PLAY})
        } else {
            dispatch({type: PAUSE})
        }
    }, [])

    function play() {
        if (player.pause) {
            dispatch({type: PLAY});
            audio.play();
        } else {
            dispatch({type: PAUSE});
            audio.pause();
        }
    }

    if (!player.active) {
        return null;
    }

    return (
        <div
            className="bg-[#181818] border-t border-solid border-[#484848] z-40 text-white pb-3 pt-2.5 px-6 flex justify-between items-center flex-wrap gap-x-6 gap-y-2">
            <CurrentTrackInfo image={image ?? ""}
                              title={player?.active.title}
                              user={user ?? ""}/>
            <div className={`flex flex-col grow max-w-screen-lg`}>
                <Buttons play={play}
                         isPlaying={player.pause}/>
                <TrackProgress ref={trackProgressRef}
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
