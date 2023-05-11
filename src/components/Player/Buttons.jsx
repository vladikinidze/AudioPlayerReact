import {AiFillPlayCircle, AiFillPauseCircle} from "react-icons/ai";
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {BsRepeat, BsRepeat1, BsShuffle} from "react-icons/bs"
import {useDispatch, useSelector} from "react-redux";
import {SET_MODE} from "../../actions/playerActions";
import {SET_QUEQE} from "../../actions/trackActions";
import {shuffle} from "../../utils";

function Buttons({play, isPlaying}) {
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);
    const tracks = useSelector(state => state.track);
    function onClicked() {
        if (player.mode + 1 === 4) {
            dispatch({type: SET_MODE, payload: 1})
            return;
        }
        dispatch({type: SET_MODE, payload: player.mode + 1})
    }

    function shuffleClicked() {
        const result = shuffle(Object.values(tracks.queue));
        dispatch({type: SET_QUEQE, payload: result});
    }

    return (
        <div className="grow flex flex-row items-center justify-center mb-2">
            <BsShuffle className="w-4 h-4 mx-2.5 hover:fill-[#1cb955]" onClick={shuffleClicked}/>
            <BiSkipPrevious className="w-9 h-9 mx-2 hover:fill-[#1cb955]"/>
            {isPlaying
                ? <AiFillPlayCircle className="w-10 h-10 hover:fill-[#1cb955]" onClick={play}/>
                : <AiFillPauseCircle className="w-10 h-10 hover:fill-[#1cb955]" onClick={play}/>
            }
            <BiSkipNext className="w-9 h-9 mx-2 hover:fill-[#1cb955]"/>
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