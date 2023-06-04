import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useRange from "../../hooks/useRange";
import {FaBars} from "react-icons/fa";
import CurrentTrackInfo from "./CurrentTrackInfo";
import Buttons from "./Buttons";
import TrackProgress from "./TrackProgress";
import Volume from "./Volume";
import {
    CIRCLE, CIRCLE_ONE,
    FLOW,
    PAUSE,
    PLAY, SET_ACTIVE,
    SET_CURRENT_TIME,
    SET_DURATION, SET_TRACK_IMAGE,
    SET_VOLUME
} from "../../actions/playerActions";
import useFetching from "../../hooks/useFetching";
import PlaylistService from "../../API/PlaylistService";
import UserService from "../../API/UserService";
import {getObjectIndex} from "../../utils";

let audio;
function Player({averageColor, showNotify}) {
    const trackProgressRef = useRef();
    const trackProgress = useRange(() => trackProgressRef);
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);
    const track = useSelector(state => state.track);
    const buttonsClasses = "w-4.75 h-4.75 ml-3 fill-[#b3b3b3] hover:fill-[#1cb955]";
    const [image, setImage] = useState();
    const [user, setUser] = useState();
    const [isEnded, setIsEnded] = useState(false);

    const [fetchPlaylist, isLoading, error] = useFetching(async () => {
        const playlist = await PlaylistService.getById(player.active.playlistId);
        const user = await UserService.getById(playlist.userId)
        setUser(user)
        setImage(playlist.image);
        dispatch({type: SET_TRACK_IMAGE, payload: playlist.image})
    });

    function setAudio() {
        if (player.active) {
            audio.preload = "metadata";
            audio.crossOrigin = "anonymous";
            audio.src = `https://localhost:7182/api/1.0/File/${player.active.audio}`;
            fetchPlaylist();
            audio.play();
            audio.volume = player.volume / 100;
            dispatch({type: PLAY});
            audio.onloadeddata = () => {
                dispatch({type: SET_DURATION, payload: audio.duration})
            }
            audio.ontimeupdate = () => {
                setCurrentTime(audio.currentTime);
            }
            audio.onended = () => {
                setIsEnded(true);
            }
        }
    }

    useEffect(() => {
        if (isEnded && player.active) {
            const index = getObjectIndex(player.active, track.queue);
            if (player.mode === CIRCLE_ONE) {
                dispatch({type: SET_ACTIVE, payload: track.queue[index]})
                audio.play();
            } else {
                if (index === Object.values(track.queue).length - 1) {
                    dispatch({type: SET_ACTIVE, payload: track.queue[0]})
                    if (player.mode === FLOW) {
                        dispatch({type: PAUSE})
                        return;
                    }
                } else {
                    dispatch({type: SET_ACTIVE, payload: track.queue[index + 1]})
                }
            }
            setIsEnded(false);
        }
    }, [isEnded])

    useEffect(() => {
        if (audio) {
            if (!player.pause) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [player.pause])

    useEffect(() => {
        if (player.active) {
            if (!audio) {
                audio = new Audio();
            }
            if (isEnded === false) {
                setAudio();
            }
        }
    }, [isEnded, player.active])

    function setVolume(volume) {
        dispatch({type: SET_VOLUME, payload: volume})
        audio.volume = volume / 100;
        if (sessionStorage.getItem("auth")) {
            sessionStorage.setItem("volume", volume);
        } else {
            localStorage.setItem("volume", volume);
        }
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
        if (isEnded === true) {
            setIsEnded(prev => !prev);
        }
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
            className="bg-[#181818] border-t border-solid border-[#484848] z-40 text-white pb-3 pt-2.5 p-6 flex justify-between items-center flex-wrap gap-x-6 gap-y-2">
            <CurrentTrackInfo image={image ?? ""}
                              trackId={player?.active?.id}
                              title={player?.active?.title}
                              user={user ?? ""}/>
            <div className={`flex flex-col px-3 grow max-w-screen-xl`}>
                <Buttons play={play}
                         showNotify={showNotify}
                         isPlaying={player.pause}/>
                <TrackProgress ref={trackProgressRef}
                               setValue={setCurrentTime}
                               trackProgress={trackProgress}/>
            </div>
            <div className="flex flex-row items-center justify-end w-[250px] p-3">
                <Volume setVolume={setVolume}/>
            </div>
        </div>
    )
}

export default Player;
