import {useRef, useState} from "react";
import {getFormatTime} from "../../utils";
import {FaPause, FaPlay} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {PAUSE, PLAY, SET_ACTIVE} from "../../actions/playerActions";
import {HiXMark} from "react-icons/hi2";
import {AiOutlineEdit} from "react-icons/ai";
import AddUpdateTrack from "../AddUpdateTrack";
import {BsDownload, BsExplicit} from "react-icons/bs";
import Delete from "../Delete";
import FileService from "../../API/FileService";
import {Link} from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import TrackService from "../../API/TrackService";


function Track({id, isOwner, explicit, index, onClick, track, playlistId, isFavorite, className, modal, changed}) {
    const trackRef = useRef();
    const [isOver, setIsOver] = useState(false);
    const dispatch = useDispatch();
    const player = useSelector(state => state.player);
    const app = useSelector(state => state.app);

    const [deleteFromFavorite, deleteLoading, deleteError] = useFetching(async () => {
        const response = await TrackService.deleteFromFavorite(id);
    });

    function isCurrentTrack() {
        return JSON.stringify(player.active) === JSON.stringify(track);
    }

    function play() {
        onClick();
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
             className={`${className} ${app.explicit && explicit ? "pointer-events-none opacity-60" : ""} flex flex-row items-center justify-start my-0.5 h-[50px] hover:bg-[#686868]`}>
            <div className="mx-6 font-bold w-4 min-w-[16px] tracking-wide">
                {player.pause
                    ? isOver
                        ? <FaPause className="fill-white -ml-[3px] hover:fill-[#1cb955]" onClick={play}/>
                        : index
                    : JSON.stringify(player.active.id) === JSON.stringify(track.id)
                        ? <FaPlay className="-ml-[3px] fill-[#1cb955]" onClick={play}/>
                        : isOver
                            ? <FaPlay className="-ml-[3px] fill-[#1cb955]" onClick={play}/>
                            : index
                }
            </div>
            {track.explicit && <BsExplicit className="ml-6 -mr-2"/>}
            <p className="mx-6 grow tracking-wide whitespace-nowrap text-ellipsis overflow-hidden">
                {track.title}
            </p>
            <p className="mx-6 tracking-wide">{getFormatTime(track.duration)}</p>
            {isOver && isOwner && (
                <>
                    {!isFavorite &&
                        <AiOutlineEdit className="h-5 w-5 hover:fill-[#1cb955] -ml-3 mr-1"
                                       onClick={() => {
                                           modal.open(<AddUpdateTrack track={track}
                                                                      modal={modal}
                                                                      changed={changed}
                                                                      playlistId={track.playlistId}/>)
                                       }}/>
                    }
                    <HiXMark className="h-6 w-6 hover:fill-[#1cb955] mr-1.5"
                             onClick={() => {
                                 if (isFavorite) {
                                     deleteFromFavorite();
                                 } else {
                                     modal.open(<Delete track={track} changed={changed} modal={modal}/>)
                                 }
                             }}/>
                    <BsDownload className="w-4.75. w-4.75. hover:fill-[#1cb955] mr-4"
                                onClick={() => {
                                    let element = document.createElement('a');
                                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + track.title);
                                    element.setAttribute('download', track.audio);
                                    element.style.display = 'none';
                                    document.body.appendChild(element);
                                    element.click();
                                    document.body.removeChild(element);
                                }}/>
                </>
            )}
        </div>
    );
}

export default Track;