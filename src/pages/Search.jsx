import {useEffect, useMemo, useState} from "react";
import Loader from "../components/UI/Loader/Loader";
import PlaylistService from "../API/PlaylistService";
import useFetching from "../hooks/useFetching";
import Section from "../components/Section";
import TrackService from "../API/TrackService";
import Track from "../components/Tracks/Track";
import {SET_QUEUE} from "../actions/trackActions";
import {useDispatch, useSelector} from "react-redux";

function Search({showPopup, showNotify, modal, setColor, searchQuery, toggleScrolling, averageBackgroundColor}) {
    const [playlists, setPlaylists] = useState();
    const [tracks, setTracks] = useState();
    const dispatch = useDispatch();
    const trackReducer = useSelector(state => state.track);
    const [fetch, isLoading, Error] = useFetching(async () => {
        const playlists = await PlaylistService.getAll();
        setPlaylists(playlists);
        const tracks = await TrackService.getAll();
        setTracks(tracks);
    });

    useEffect(() => {
        averageBackgroundColor.setColor("#121212");
    }, [])

    useEffect(() => {
        if (!searchedPlaylists) {
            fetch();
        }
    }, [searchQuery])

    function setTrackList(trackList) {
        if (trackReducer?.queue !== trackList) {
            dispatch({type: SET_QUEUE, payload: trackList});
        }
    }

    const searchedTracks = useMemo(() => {
        if (searchQuery === "") {
            return
        }
        const result = tracks?.filter(track =>
            track.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        return result.length > 10 ? result.splice(9) : result;
    }, [tracks, searchQuery])

    const searchedPlaylists = useMemo(() => {
        if (searchQuery === "") {
            return
        }
        const result = playlists?.filter(playlist =>
            playlist.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        return result.length > 10 ? result.splice(9) : result;
    }, [playlists, searchQuery])

    return (
        <>
            {!searchedPlaylists || !searchedTracks
                ?
                <p className="text-3xl font-extrabold text-center tracking-wide mt-4 mb-8 mx-auto">
                    Начните вводить название интересующего трека или плейлиста
                </p>
                :
                !searchedPlaylists?.length || !searchedTracks?.length
                    ?
                    <p className="text-3xl font-extrabold text-center tracking-wide mt-4 mb-8 mx-auto">
                        Треков или плейлистов с таким названием не нашлось
                    </p>
                    :
                    <div className="flex flex-col items-center">
                        <Section title="Плейлисты"
                                 playlists={searchedPlaylists}
                                 isSearch={true}
                                 toggleScrolling={toggleScrolling}
                                 showNotify={showNotify}
                                 showPopup={showPopup}
                                 openModal={modal.open}
                                 averageBackgroundColor={averageBackgroundColor}/>
                        <div className="mt-6 w-full">
                            <h2 className="text-2xl font-semibold mb-5">
                                {/*hover:underline*/}
                                {/*<Link to="/playlists/all">{title}</Link>*/}
                                Треки
                            </h2>
                            {searchedTracks?.map((track, index) => (
                                <Track key={track.id}
                                       className="w-full border-y"
                                       index={index + 1}
                                       isFavorite={false}
                                       isOwner={false}
                                       explicit={track.explicit}
                                       onClick={setTrackList}
                                       track={track}
                                       playlistId={track.playlistId}
                                       id={track.id}
                                />
                            ))}
                        </div>
                    </div>
            }
        </>
    );
}

export default Search;