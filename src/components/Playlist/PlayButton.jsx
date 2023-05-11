import {useEffect, useState} from "react";
import {FaPause, FaPlay} from "react-icons/fa";
import useFetching from "../../hooks/useFetching";
import TrackServise from "../../API/TrackServise";
import {useDispatch, useSelector} from "react-redux";
import {PAUSE, PLAY, SET_ACTIVE} from "../../actions/playerActions";
import {SET_QUEQE} from "../../actions/trackActions";


function PlayButton({playlistsId}) {

    const [tracks, setTracks] = useState();
    const dispatch = useDispatch();
    const player = useSelector(state => state.track);
    const [fetchTracks, isTracksloading, tracksError] = useFetching(async () => {
        const tracks = await TrackServise.getByPlaylistId(playlistsId);
        dispatch({type: SET_QUEQE, payload: tracks});
        setTracks(tracks);
    });

    useEffect(() => {

    }, [])

    function play(event) {
        event.stopPropagation();
        fetchTracks();
        dispatch({type: SET_ACTIVE, payload: tracks[0]})
        if (player.pause) {
            dispatch({type: PLAY})
        } else {
            dispatch({type: PAUSE})
        }
    }

    return (
        <button className="h-10 w-10 bg-[#1cb955] rounded-full shadow-xl absolute right-2 bottom-2 flex justify-center items-center cursor-auto duration-200 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105 z-10"
                onClick={play}>
            <FaPlay className="h-4 w-4 ml-0.5"/>
        </button>
    )
}

export default PlayButton;