import {useEffect, useState} from "react";
import Track from "./Track";
import {BsClock} from "react-icons/bs";
import TrackServise from "../../API/TrackServise";
import {useDispatch, useSelector} from "react-redux";
import useFetching from "../../hooks/useFetching";
import {SET_QUEQE} from "../../actions/trackActions";


function Tracks({playlistId}) {
    const dispatch = useDispatch();
    const track = useSelector(state => state.track);
    const [tracks, setTracks] = useState();
    const [fetchTracks, isLoading, error] = useFetching(async () => {
        const track = await TrackServise.getByPlaylistId(playlistId);
        setTracks(track);
        dispatch({type: SET_QUEQE, payload: {...track}});
    })

    useEffect(() => {
        fetchTracks();
    }, [])



    return (
        <div>
            <div className="flex flex-row items-center justify-between border-b-2 py-2">
                <p className="mx-6 font-bold w-4 tracking-wide">#</p>
                <p className="mx-6 uppercase grow tracking-wide">Title</p>
                <BsClock className="w-5 h-5 mx-8"/>
            </div>
            {tracks
                ? tracks.map((track, index) => (
                            <Track key={track.id}
                                   index={index + 1}
                                   track={track}
                                   id={track.id}/>
                        ))
                : "f"
            }
        </div>
    );
}

export default Tracks;