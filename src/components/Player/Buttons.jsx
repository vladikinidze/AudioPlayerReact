import {AiFillPlayCircle, AiFillPauseCircle} from "react-icons/ai";
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {BsRepeat, BsRepeat1, BsShuffle} from "react-icons/bs"
import {useDispatch, useSelector} from "react-redux";
import {CIRCLE, CIRCLE_ONE, FLOW, SET_ACTIVE, SET_CURRENT_TIME, SET_MODE} from "../../actions/playerActions";
import {SET_NORMAL, SET_QUEUE, SET_SHUFFLE} from "../../actions/trackActions";
import {getObjectIndex} from "../../utils";
import {useEffect, useState} from "react";

function Buttons({play, isPlaying, showNotify}) {
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);
    const track = useSelector(state => state.track);
    const [next, setNext] = useState(false);
    useEffect(() => {
        const storage = sessionStorage.getItem("mode") ?? localStorage.getItem("mode");
        dispatch({type: SET_MODE, payload: storage});
    }, [])

    function onClicked() {
        let mode;
        if (player.mode === FLOW) {
            mode = CIRCLE_ONE;
            showNotify('Повторять текущий');
        } else if (player.mode === CIRCLE_ONE) {
            mode = CIRCLE;
            showNotify('Повторять плейлист');
        } else {
            mode = FLOW;
        }
        dispatch({type: SET_MODE, payload: mode})
        if (sessionStorage.getItem("auth")) {
            sessionStorage.setItem("mode", mode);
        } else {
            localStorage.setItem("mode", mode);
        }
    }

    function shuffleClicked(event) {
        event.preventDefault();
        event.stopPropagation();
        if (track.shuffle) {
            dispatch({type: SET_NORMAL});
            dispatch({type: SET_ACTIVE, payload: track.queue[0]});
            showNotify('Треки по порядку');
        } else {
            dispatch({type: SET_SHUFFLE});
            dispatch({type: SET_ACTIVE, payload: track.queue[0]});
            showNotify('Треки перемешаны');
        }
    }

    function previousClick() {
        const index = getObjectIndex(player.active, track.queue);
        if (next === false) {
            if (index === 0) {
                dispatch({type: SET_ACTIVE, payload: track.queue[Object.values(track.queue).length - 1]})
            } else {
                dispatch({type: SET_ACTIVE, payload: track.queue[index - 1]})
            }
            setNext(true);
        } else {
            dispatch({type: SET_CURRENT_TIME, payload: 0})
            setNext(false);
        }
    }

    function nextClick() {
        const index = getObjectIndex(player.active, track.queue);
        if (index === Object.values(track.queue).length - 1) {
            dispatch({type: SET_ACTIVE, payload: track.queue[0]})
        } else {
            dispatch({type: SET_ACTIVE, payload: track.queue[index + 1]})
        }
    }

    return (
        <div className="grow flex flex-row items-center justify-center mb-2">
            <BsShuffle className={`w-4 h-4 mx-2.5 ${track.shuffle ? "fill-[#1cb955]" : "fill-[#b3b3b3]"} hover:fill-[#1cb955]`}
                       onClick={shuffleClicked}/>
            <BiSkipPrevious className="w-9 h-9 mx-2 hover:fill-[#1cb955]"
                            onClick={previousClick}/>
            {isPlaying
                ? <AiFillPlayCircle className="w-10 h-10 hover:fill-[#1cb955]"
                                    onClick={play}/>
                : <AiFillPauseCircle className="w-10 h-10 hover:fill-[#1cb955]"
                                     onClick={play}/>
            }
            <BiSkipNext className="w-9 h-9 mx-2 hover:fill-[#1cb955]"
                        onClick={nextClick}/>
            <button onClick={onClicked}>
                {player.mode === FLOW
                    ? <BsRepeat className="w-4 h-4 mx-2 hover:fill-[#1cb955]"/>
                    : player.mode === CIRCLE_ONE
                        ? <BsRepeat1 className="w-4 h-4 mx-2 fill-[#1cb955]"/>
                        : <BsRepeat className="w-4 h-4 mx-2 fill-[#1cb955]"/>
                }
            </button>
        </div>
    );
}

export default Buttons;