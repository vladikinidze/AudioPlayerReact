import {useEffect, useMemo, useState} from "react";
import Loader from "../components/UI/Loader/Loader";
import PlaylistService from "../API/PlaylistService";
import useFetching from "../hooks/useFetching";
import Section from "../components/Section";

function Search({showPopup, showNotify, modal, setColor, searchQuery, toggleScrolling, averageBackgroundColor}) {
    const [playlists, setPlaylists] = useState();
    const [fetchPlaylists, isLoading, error] = useFetching(async () => {
        const result = await PlaylistService.getAll();
        setPlaylists(result);
    });

    useEffect(() => {
        fetchPlaylists();
    }, [])

    const searchedPlaylists = useMemo(() => {
        return playlists?.filter(playlist =>
            playlist.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [playlists])

    return (
        <>
            {isLoading
                ? <Loader />
                :  <Section playlists={searchedPlaylists}
                            isSearch={true}
                            toggleScrolling={toggleScrolling}
                            showNotify={showNotify}
                            showPopup={showPopup}
                            openModal={modal.open}
                            averageBackgroundColor={averageBackgroundColor}/>
            }
        </>
    );
}

export default Search;