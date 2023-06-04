import useFetching from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import Section from "../components/Section";


function Library({showPopup, modal, toggleScrolling, averageBackgroundColor, showNotify}) {
    const user = useSelector(state => state.user);
    const [userPlaylists, setUserPlaylists] = useState();
    const [fetchLibrary, isLibraryLoading, fetchLibraryError] = useFetching(async () => {
        const response = await PlaylistService.getUserPlaylists(user.guid);
        setUserPlaylists(response);
    });

    const playlists = useMemo(() => {
        return userPlaylists?.playlists;
    }, [userPlaylists])

    useEffect(() => {
        if (user?.guid) {
            fetchLibrary();
        }
    }, [user.guid])

    useEffect(() => {
        averageBackgroundColor.setColor("#121212");
    }, [])

    return (
        <div>
            {playlists && <Section title="Мои плейлисты"
                                   playlists={playlists}
                                   toggleScrolling={toggleScrolling}
                                   showNotify={showNotify}
                                   averageBackgroundColor={averageBackgroundColor}
                                   openModal={modal.open}
                                   showPopup={showPopup}
                                   isSearch={false}/>}
        </div>
    );
}

export default Library;