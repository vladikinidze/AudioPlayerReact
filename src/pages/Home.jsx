import {useEffect, useMemo, useState} from "react";
import Section from "../components/Section";
import useFetching from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";
import {useSelector} from "react-redux";

function Home({showPopup, showNotify, modal, averageBackgroundColor, toggleScrolling}) {
    const user = useSelector(state => state.user);
    const [lastAddedPlaylists, setLastAddedPlaylists] = useState();
    const [fetchPlaylists, isLoading, error] = useFetching(async () => {
        const playlists = await PlaylistService.getAll();
        setLastAddedPlaylists(playlists);
    });

    useEffect(() => {
        averageBackgroundColor.setColor("#121212");
    }, [])

    useEffect(() => {
        if (!playlists) {
            fetchPlaylists();
        }
    }, [user])

    const playlists = useMemo(() => {
        return lastAddedPlaylists;
    }, [lastAddedPlaylists])

    return (
        <div>
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
        </div>
    );
}

export default Home;
