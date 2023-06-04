import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import PlaylistUserCard from "../components/PlaylistUserCard";
import Tracks from "../components/Tracks/Tracks";
import Image from "../components/UI/Image";
import PlaylistService from "../API/PlaylistService";
import FileService from "../API/FileService";
import UserService from "../API/UserService";
import Button from "../components/UI/Button";
import AddUpdateTrack from "../components/AddUpdateTrack";
import useFetching from "../hooks/useFetching";
import {useDispatch, useSelector} from "react-redux";
import {BsShuffle} from "react-icons/bs";
import {VscDiffAdded} from "react-icons/vsc";
import {HiXMark} from "react-icons/hi2";
import {AiOutlineEdit} from "react-icons/ai";
import Delete from "../components/Delete";
import AddUpdatePlaylist from "../components/AddUpdatePlaylist";
import {MdDownloadDone} from "react-icons/md";
import {SET_GUID} from "../actions/userActions";
import {SET_NORMAL, SET_QUEUE, SET_SHUFFLE} from "../actions/trackActions";
import {PAUSE, PLAY, SET_ACTIVE} from "../actions/playerActions";
import {FaPause, FaPlay} from "react-icons/fa";

function Playlist({showPopup, showNotify, modal, toggleScrolling, averageBackgroundColor}) {
    const imageRef = useRef();
    const user = useSelector(state => state.user);
    const player = useSelector(state => state.player);
    const params = useParams();
    const [playlist, setPlaylist] = useState();
    const [changed, setChanged] = useState(false);
    const [isAddedByUser, setIsAddedByUser] = useState(false);
    const track = useSelector(state => state.track);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let playlistId;
    const [fetchPlaylist, fetchLoading, fetchError] = useFetching(async () => {
        const playlist = await PlaylistService.getById(params.playlistId);
        setPlaylist(playlist);
        playlistId = playlist.id
        isAdded();
    })

    const [isAdded, asAddedLoading, isAddedError] = useFetching(async () => {
        const response = await PlaylistService.isAdded(playlistId);
        setIsAddedByUser(response);
    });

    const [addRemovePlaylist, idAddLoading, addError] = useFetching(async () => {
        if (!isAddedByUser) {
           await PlaylistService.addPlaylist(playlist?.id);
            showNotify("Плейлист добавлен")
        } else {
            await PlaylistService.deletePlaylist(playlist?.id);
            showNotify("Плейлист удален")
        }
        setChanged(prevState => !prevState);
    });

    const [refreshToken, refreshLoading, refreshError] = useFetching(async () => {
        const storage = JSON.parse(sessionStorage.getItem("auth") ?? localStorage.getItem("auth"));
        const response = await UserService.refreshToken(
            storage.userId,
            storage.accessToken,
            storage.refreshToken)
        if (localStorage.getItem("auth")) {
            localStorage.setItem("auth", JSON.stringify(response));
        } else if (sessionStorage.getItem("auth")) {
            sessionStorage.setItem("auth", JSON.stringify(response));
        }
        dispatch({type: SET_GUID, payload: response.userId});
    });

    useEffect(() => {
        if (addError) {
            if (addError.status === 401) {
                refreshToken();
                fetchPlaylist();
            }
        }
    }, [addError])

    useEffect(() => {
        if (isAddedError) {
            if (isAddedError.status === 401) {
                refreshToken();
                isAdded();
            }
        }
    }, [isAddedError])

    useEffect(() => {
        if (fetchError) {
            if (fetchError?.status === 404) {
                navigate("/");
            } else if (fetchError.status === 401) {
                refreshToken();
            }
        }

    }, [fetchError])

    useEffect(() => {
        fetchPlaylist();
    }, [changed])

    function setBackground() {
        averageBackgroundColor.set(imageRef);
    }

    function play(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!playlist?.tracks.length) {
            return;
        }
        if (JSON.stringify(playlist?.tracks) !== JSON.stringify(track.queue)) {
            dispatch({type: SET_QUEUE, payload: playlist?.tracks})
            dispatch({type: SET_ACTIVE, payload: playlist?.tracks[0]})
        } else {
            if (player.pause) {
                dispatch({type: PLAY})
            } else {
                dispatch({type: PAUSE})
            }
        }
    }

    function shuffleClicked(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!playlist?.tracks.length) {
            return;
        }
        dispatch({type: SET_QUEUE, payload: playlist?.tracks})
        if (track.shuffle) {
            showNotify('Треки по порядку');
            dispatch({type: SET_NORMAL});
            dispatch({type: SET_ACTIVE, payload: playlist?.tracks[0]});

        } else {
            showNotify('Треки перемешаны');
            dispatch({type: SET_SHUFFLE});
            dispatch({type: SET_ACTIVE, payload: playlist?.tracks[0]});
        }
    }

    return (
        <div onLoad={setBackground}>
            {playlist &&
                <div className="flex flex-col flex-grow pl-6 py-6">
                    <div className="flex flex-row flex-grow mb-6">
                        <Image ref={imageRef}
                               url={FileService.getFile(playlist?.image ? playlist.image : "548864f8-319e-40ac-9f9b-a31f65ccb902.jpg")}
                               className="w-[230px] h-[230px]"/>
                        <PlaylistUserCard playlist={playlist}/>
                    </div>
                    <div className="flex flex-row justify-between items-center mb-6">
                        <div className="flex flex-row items-center">
                            <BsShuffle
                                className={`w-6 h-6 ${track.shuffle ? "fill-[#1cb955]" : "fill-[#b3b3b3]"} hover:fill-[#1cb955] mr-4`}
                                onClick={shuffleClicked}/>
                            {player?.pause
                                ? <FaPlay className="ml-[3px] mr-4 w-5 h-5 fill-[#b3b3b3] hover:fill-[#1cb955]" onClick={play}/>
                                : <FaPause className="ml-[3px] mr-4 w-5 h-5 fill-[#1cb955]" onClick={play}/>
                            }
                            {user.guid
                                ? playlist?.isOwner
                                    ? <></>
                                    : isAddedByUser
                                        ? <MdDownloadDone className="w-7 h-7 mr-2 fill-[#b3b3b3] hover:fill-[#1cb955]"
                                                          onClick={addRemovePlaylist}/>
                                        : <VscDiffAdded className="w-7 h-7 mt-0.5 mr-2 fill-[#b3b3b3] hover:fill-[#1cb955]"
                                                        onClick={addRemovePlaylist}/>
                                : <></>
                            }
                        </div>
                        {playlist.isOwner && user &&
                            <div className="flex flex-row items-center">
                                <Button primary className="bg-gray-100" onClick={() =>
                                    modal.open(
                                        <AddUpdateTrack changed={setChanged}
                                                        playlistId={playlist.id}
                                                        modal={modal}/>
                                    )}>
                                    Добавить трек
                                </Button>
                                <AiOutlineEdit className="w-7 h-7 mt-0.5 ml-3 mr-2 hover:fill-[#1cb955]"
                                               onClick={() => {
                                                   modal.open(<AddUpdatePlaylist playlist={playlist}
                                                                                 isFavorite={false}
                                                                                 changed={setChanged}
                                                                                 modalClose={modal.close}/>)
                                               }}/>
                                <HiXMark className="h-8 w-8 hover:fill-[#1cb955] mr-2"
                                         onClick={() => modal.open(<Delete playlist={playlist} modal={modal}/>)}/>
                            </div>
                        }
                    </div>
                    {playlist?.tracks?.length
                        ?
                        <Tracks modal={modal}
                                isFavorite={false}
                                isOwner={playlist.isOwner}
                                changed={setChanged}
                                trackList={playlist?.tracks}/>
                        :
                        <div className="flex flex-col items-center">
                            <p className="text-3xl font-extrabold text-center tracking-wide mt-4 mb-8">
                                Этот плейлист пустой
                            </p>
                            {playlist.isOwner && user &&
                                <Button primary
                                        className="bg-white hover:bg-[#1cb955] w-[200px]"
                                        onClick={() =>
                                            modal.open(
                                                <AddUpdateTrack changed={setChanged}
                                                                playlistId={playlist.id}
                                                                modal={modal}/>
                                            )}>
                                    Добавить трек
                                </Button>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default Playlist;