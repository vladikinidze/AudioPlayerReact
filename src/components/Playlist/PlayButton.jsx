import {FaPause, FaPlay} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {PAUSE, PLAY, SET_ACTIVE} from "../../actions/playerActions";
import {SET_QUEUE} from "../../actions/trackActions";


function PlayButton({trackList, playlistId}) {
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);

    function play(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!trackList.length) {
            return;
        }
        if (player?.active?.playlistId !== playlistId) {
            dispatch({type: SET_QUEUE, payload: trackList})
            dispatch({type: SET_ACTIVE, payload: trackList[0]})
        } else {
            if (player.pause) {
                dispatch({type: PLAY})
            } else {
                dispatch({type: PAUSE})
            }
        }
    }

    return (
        <button
            className={`h-10 w-10 bg-[#1cb955] rounded-full shadow-xl absolute right-2 flex justify-center items-center cursor-auto duration-200 opacity-0 translate-y-3 ${player?.active?.playlistId === playlistId ? "opacity-100 translate-y-0 bottom-5" : "bottom-2 group-hover:opacity-100 group-hover:translate-y-0"} hover:scale-105 z-10`}
            onClick={play}>
            {player?.active?.playlistId === playlistId
                ? !player?.pause
                    ? <FaPlay className="h-4 w-4 ml-0.5"/>
                    : <FaPause className="h-4 w-4"/>
                : <FaPlay className="h-4 w-4 ml-0.5"/>
            }
        </button>
    )
}

export default PlayButton;