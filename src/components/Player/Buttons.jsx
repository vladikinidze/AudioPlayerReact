import {AiFillPlayCircle, AiFillPauseCircle} from "react-icons/ai";
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {BsRepeat, BsRepeat1, BsShuffle} from "react-icons/bs"
import {useDispatch, useSelector} from "react-redux";
import {PAUSE, PLAY, SET_ACTIVE, SET_CURRENT_TIME, SET_MODE} from "../../actions/playerActions";
import {SET_QUEQE} from "../../actions/trackActions";
import {getObjectIndex, shuffle} from "../../utils";

function Buttons({play, isPlaying}) {
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);
    const tracks = useSelector(state => state.track);

    function onClicked() {
        if (player.mode === 3) {
            dispatch({type: SET_MODE, payload: 1})
        } else {
            const mode = player.mode;
            dispatch({type: SET_MODE, payload: Number(mode) + 1})
        }
    }

    function shuffleClicked() {
        const result = shuffle(Object.values(tracks.queue));
        dispatch({type: SET_QUEQE, payload: result});
        dispatch({type: SET_ACTIVE, payload: tracks.queue[0]})
    }

    function previousClick() {
        const index = getObjectIndex(player.active, tracks.queue);
        if (index === 0) {
            dispatch({type: SET_ACTIVE, payload: tracks.queue[Object.values(tracks.queue).length - 1]})
        } else {
            dispatch({type: SET_ACTIVE, payload: tracks.queue[index - 1]})
        }
    }

    function nextClick() {
        const index = getObjectIndex(player.active, tracks.queue);
        if (index === Object.values(tracks.queue).length - 1) {
            dispatch({type: SET_ACTIVE, payload: tracks.queue[0]})
        } else {
            dispatch({type: SET_ACTIVE, payload: tracks.queue[index + 1]})
        }
    }

    return (
        <div className="grow flex flex-row items-center justify-center mb-2">
            <BsShuffle className="w-4 h-4 mx-2.5 hover:fill-[#1cb955]" onClick={shuffleClicked}/>
            <BiSkipPrevious className="w-9 h-9 mx-2 hover:fill-[#1cb955]" onClick={previousClick}/>
            {isPlaying
                ? <AiFillPlayCircle className="w-10 h-10 hover:fill-[#1cb955]" onClick={play}/>
                : <AiFillPauseCircle className="w-10 h-10 hover:fill-[#1cb955]" onClick={play}/>
            }
            <BiSkipNext className="w-9 h-9 mx-2 hover:fill-[#1cb955]" onClick={nextClick}/>
            <button onClick={onClicked}>
                {player.mode === 1
                    ? <BsRepeat className="w-4 h-4 mx-2 hover:fill-[#1cb955]"/>
                    : player.mode === 2
                        ? <BsRepeat1 className="w-4 h-4 mx-2 fill-[#1cb955]"/>
                        : <BsRepeat className="w-4 h-4 mx-2 fill-[#1cb955]"/>
                }
            </button>
        </div>
    );
}

export default Buttons;