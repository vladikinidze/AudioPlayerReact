import {useParams} from "react-router-dom";

function Playlist({showPopup, showNotify, modal, setColor, toggleScrolling}) {
    const params = useParams();
    return (
        <div className="flex flex-grow items-center justify-center">
            {params.playlistId}
        </div>
    );
}

export default Playlist;