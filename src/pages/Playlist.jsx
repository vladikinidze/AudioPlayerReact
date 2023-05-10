import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import PlaylistArtistCard from "../components/PlaylistArtistCard";
import Tracks from "../components/Tracks/Tracks";
import Image from "../components/UI/Image";
import PlaylistService from "../API/PlaylistService";
import FileService from "../API/FileService";

function Playlist({showPopup, showNotify, modal, setColor, toggleScrolling}) {
    const imageRef = useRef();
    const params = useParams();
    const [playlist, setPlaylist] = useState();

    async function fetchPlaylist() {
        const playlist = await PlaylistService.getById(params.playlistId);
        setPlaylist(playlist)
    }

    useEffect(() => {
        fetchPlaylist();
    }, [])

    return (
        <div className="">
            {playlist
                ? <div className="flex flex-col flex-grow pl-6 py-6">
                    <div className="flex flex-row flex-grow mb-6">
                        <Image ref={imageRef}
                               url={FileService.getFile(playlist.image)}
                               className="w-[230px] h-[230px]"/>
                        <PlaylistArtistCard playlist={playlist} />
                    </div>
                    <Tracks playlistId={playlist.id} />
                </div>
                : "f"
            }
        </div>
    );
}

export default Playlist;