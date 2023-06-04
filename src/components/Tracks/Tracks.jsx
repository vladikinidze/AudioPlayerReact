import {useMemo} from "react";
import Track from "./Track";
import {BsClock} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {SET_QUEUE} from "../../actions/trackActions";

function Tracks({trackList, isOwner, changed, modal, isFavorite}) {
    const dispatch = useDispatch();
    const trackReducer = useSelector(state => state.track);

    function setTracks() {
        if (trackReducer?.queue !== trackList) {
            dispatch({type: SET_QUEUE, payload: trackList});
        }
    }

    const tracks = useMemo(() => {
        return trackList
    }, [trackList])

    return (
        <div>
            <div className="flex flex-row items-center justify-between border-b-2 py-2">
                <p className="mx-6 font-bold w-4 tracking-wide">#</p>
                <p className="mx-6 uppercase grow tracking-wide">Title</p>
                <BsClock className="w-5 h-5 mx-9"/>
            </div>
            {tracks
                ? tracks.map((track, index) => (
                    <Track key={track.id}
                           onClick={setTracks}
                           isOwner={isOwner}
                           index={index + 1}
                           track={track}
                           modal={modal}
                           className="rounded"
                           explicit={track.explicit}
                           isFavorite={isFavorite}
                           playlistId={track.playlistId}
                           changed={changed}
                           id={track.id}/>
                ))
                : "f"
            }
        </div>
    );
}

export default Tracks;