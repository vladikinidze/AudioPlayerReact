import {useEffect, useState} from "react";
import PlaylistService from "../API/PlaylistService";
import Section from "../components/Section";

function Home({showPopup, showNotify, modal, averageBackgroundColor, toggleScrolling}) {
    const [lastAddedPlaylists, setLastAddedPlaylists] = useState();

    async function fetchPlaylists() {
        const playlists = await PlaylistService.getAll();
        setLastAddedPlaylists(playlists);
    }

    useEffect(() => {
        averageBackgroundColor.setColor("#121212");
        fetchPlaylists();
    }, [])

    return (
        <>
            {lastAddedPlaylists &&
                <Section title="Недавно добавленные"
                         isSearch={true}
                         description="Коллекция недавно добавленных плейлистов"
                         playlists={lastAddedPlaylists}
                         toggleScrolling={toggleScrolling}
                         showNotify={showNotify}
                         showPopup={showPopup}
                         openModal={modal.open}
                         averageBackgroundColor={averageBackgroundColor}/>
            }
        </>
    );
}

export default Home;
