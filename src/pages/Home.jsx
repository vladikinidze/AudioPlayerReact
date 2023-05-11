import {useEffect, useMemo, useState} from "react";
import PlaylistService from "../API/PlaylistService";
import Section from "../components/Section";
import useFetching from "../hooks/useFetching";

function Home({showPopup, showNotify, modal, averageBackgroundColor, toggleScrolling}) {
    const [lastAddedPlaylists, setLastAddedPlaylists] = useState();
    const [fetchPlaylists, isLoading, error] = useFetching( async () => {
        const playlists = await PlaylistService.getAll();
        setLastAddedPlaylists(playlists);
    });
    // async function fetchPlaylists() {
    //     const playlists = await PlaylistService.getAll();
    //     setLastAddedPlaylists(playlists);
    // }

    useEffect(() => {
        averageBackgroundColor.setColor("#121212");
        fetchPlaylists();
    }, [])

    const playlists = useMemo(() => {
        return lastAddedPlaylists;
    }, [lastAddedPlaylists])

    return (
        <>
            {lastAddedPlaylists &&
                <Section title="Недавно добавленные"
                         isSearch={true}
                         description="Коллекция недавно добавленных плейлистов"
                         playlists={playlists}
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
