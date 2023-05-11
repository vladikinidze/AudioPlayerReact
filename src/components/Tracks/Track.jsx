import {useEffect, useRef, useState} from "react";
import {getFormatTime, isEquals} from "../../utils";
import {FaPause, FaPlay} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {PAUSE, PLAY, SET_ACTIVE} from "../../actions/playerActions";



function Track({id, index, track}) {
    const trackRef = useRef();
    const [duration, setDuration] = useState();
    const [isOver, setIsOver] = useState(false);
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);

    let audio;
    useEffect(() => {
        if (!audio) {
            audio = new Audio('https://localhost:7182/api/files/' + track.audio);
            audio.onloadeddata = () => {
                setDuration(audio.duration)
            }
        }
    }, [player.active]);

    function isCurrentTrack() {
        return JSON.stringify(player.active) === JSON.stringify(track);
    }
    function play() {
        if (!isCurrentTrack()) {
            dispatch({type: SET_ACTIVE, payload: track})
            dispatch({type: PAUSE})
            return;
        }
        if (player.pause) {
            dispatch({type: PLAY})
        } else {
            dispatch({type: PAUSE})
        }
    }

    return (
        <div ref={trackRef}
             onMouseOver={() => setIsOver(true)}
             onMouseLeave={() => setIsOver(false)}
             onDoubleClick={play}
             className={`flex flex-row items-center justify-start my-0.5 h-[50px] rounded hover:bg-[#686868]`}>
            <div className="mx-6 font-bold w-4 tracking-wide">
                {!player.pause
                    ? isOver
                        ? <FaPause className="fill-white -ml-[3px] hover:fill-[#1cb955]" onClick={play}/>
                        : index
                    : JSON.stringify(player.active) === JSON.stringify(track)
                        ? <FaPlay className="-ml-[3px] fill-[#1cb955]" onClick={play}/>
                        : isOver
                            ? <FaPlay className="-ml-[3px] fill-[#1cb955]" onClick={play}/>
                            : index
                }
            </div>
            <p className="mx-6 grow tracking-wide">{track.title}</p>
            <p className="mx-6 tracking-wide">{getFormatTime(duration)}</p>
        </div>
    );
}

export default Track;