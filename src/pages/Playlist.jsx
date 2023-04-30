import {useParams} from "react-router-dom";
import image from "../components/Main/pika.jpg";
import piro from "../components/Main/piro.jpg";
import Image from "../components/UI/Image";
import {useEffect, useRef} from "react";
import PlaylistArtistCard from "../components/PlaylistArtistCard";
import Tracks from "../components/Tracks/Tracks";

const playlists = [
    {
        id: "1",
        title: "докучные сказки докучные сказки докучные",
        type: "Сингл",
        date: "23 Jan 2023",
        artist: "pyrokinisis",
        imageUrl: image,
        tracks: [
            {
                title: "Некуда бежать",
                feat: [
                    "BOOKER",
                    "МУККА"
                ],
                text: ""
            }
        ]
    },
    {
        id: "2",
        title: "докучные сказки докучные сказки докучные",
        type: "Сингл",
        date: "23 Jan 2023",
        artist: "pyrokinisis",
        imageUrl: piro,
        tracks: [
            {
                title: "Некуда бежать",
                feat: [
                    "BOOKER",
                    "МУККА"
                ],
                text: ""
            }
        ]
    }
];

function Playlist({showPopup, showNotify, modal, setColor, toggleScrolling}) {
    const imageRef = useRef();
    const params = useParams();
    const playlist = playlists.find((element) => element.id === params.playlistId);

    useEffect(() => {
        setColor(imageRef);
    })

    return (
        <div className="flex flex-col flex-grow pl-6 py-6">
            <div className="flex flex-row flex-grow mb-6">
                <Image ref={imageRef}
                       url={playlist.imageUrl}
                       className="w-[230px] h-[230px]"/>
                <PlaylistArtistCard playlist={playlist} />
            </div>
            <Tracks />
        </div>
    );
}

export default Playlist;