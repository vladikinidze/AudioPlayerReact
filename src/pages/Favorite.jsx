import Image from "../components/UI/Image";
import FileService from "../API/FileService";
import PlaylistUserCard from "../components/PlaylistUserCard";
import {BsShuffle} from "react-icons/bs";
import {MdDownloadDone} from "react-icons/md";
import {VscDiffAdded} from "react-icons/vsc";
import Button from "../components/UI/Button";
import AddUpdateTrack from "../components/AddUpdateTrack";
import {AiOutlineEdit} from "react-icons/ai";
import AddUpdatePlaylist from "../components/AddUpdatePlaylist";
import {HiXMark} from "react-icons/hi2";
import Delete from "../components/Delete";
import Tracks from "../components/Tracks/Tracks";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useFetching from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";
import UserService from "../API/UserService";
import {SET_GUID} from "../actions/userActions";
import {SET_NORMAL, SET_QUEUE, SET_SHUFFLE} from "../actions/trackActions";
import {PAUSE, PLAY, SET_ACTIVE} from "../actions/playerActions";
import {FaPause, FaPlay} from "react-icons/fa";

function Favorite({showPopup, showNotify, modal, toggleScrolling, averageBackgroundColor}) {
    const imageRef = useRef();
    const user = useSelector(state => state.user);
    const player = useSelector(state => state.player);
    const [playlist, setPlaylist] = useState();
    const track = useSelector(state => state.track);
    const navigate = useNavigate();
    const [changed, setChanged] = useState(false);
    const dispatch = useDispatch();
    const [fetchPlaylist, fetchLoading, fetchError] = useFetching(async () => {
        const playlist = await PlaylistService.getFavorite();
        setPlaylist(playlist);
    })

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

    function shuffleClicked() {
        if (!playlist?.tracks.length) {
            return;
        }
        dispatch({type: SET_QUEUE, payload: playlist?.tracks})
        if (track.shuffle) {
            dispatch({type: SET_SHUFFLE});
            dispatch({type: SET_ACTIVE, payload: playlist?.tracks[0]});
        } else {
            dispatch({type: SET_NORMAL});
            dispatch({type: SET_ACTIVE, payload: playlist?.tracks[0]});
        }
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

    useEffect(() => {
        if (fetchError) {
            if (fetchError?.status === 404) {
                navigate("/");
            } else if (fetchError.status === 401) {
                refreshToken();
                fetchPlaylist();
            }
        }

    }, [fetchError])

    useEffect(() => {
        if (!user?.guid) {
            document.querySelector('nav a:nth-child(1)').click();
        }
    }, [user])

    useEffect(() => {
        fetchPlaylist();
    }, [])

    useEffect(() => {
        if (playlist) {
            fetchPlaylist();
        }
    }, [changed])

    function setBackground() {
        averageBackgroundColor.set(imageRef);
    }

    return (
        <div onLoad={setBackground}>
            {playlist &&
                <div className="flex flex-col flex-grow pl-6 py-6">
                    <div className="flex flex-row flex-grow mb-6">
                        <Image ref={imageRef}
                               url={FileService.getFile(playlist?.image ? playlist.image : "548864f8-319e-40ac-9f9b-a31f65ccb902.jpg")}
                               className="w-[230px] h-[230px]"/>
                        <PlaylistUserCard isFavorite={true}
                                          playlist={playlist}/>
                    </div>
                    <div className="flex flex-row justify-between items-center mb-6">
                        <div className="flex flex-row items-center">
                            <BsShuffle
                                className={`w-6 h-6 ${track.shuffle ? "fill-[#1cb955]" : "fill-[#b3b3b3]"} hover:fill-[#1cb955] mr-4`}
                                onClick={shuffleClicked}/>
                            {player?.pause
                                ? <FaPlay className="ml-[3px] w-5 h-5 fill-[#1cb955]" onClick={play}/>
                                : <FaPause className="ml-[3px] w-5 h-5 fill-[#1cb955]" onClick={play}/>
                            }
                        </div>
                        {playlist.isOwner && user &&
                            <div className="flex flex-row items-center">
                                <AiOutlineEdit className="w-7 h-7 mt-0.5 ml-3 mr-2 hover:fill-[#1cb955]"
                                               onClick={() => {
                                                   modal.open(<AddUpdatePlaylist playlist={playlist}
                                                                                 isFavorite={true}
                                                                                 changed={setChanged}
                                                                                 modalClose={modal.close}/>)
                                               }}/>
                            </div>
                        }
                    </div>
                    {playlist?.tracks?.length
                        ? <Tracks modal={modal}
                                  isFavorite={true}
                                  isOwner={true}
                                  changed={setChanged}
                                  trackList={playlist.tracks}/>
                        :
                        <div className="flex flex-col items-center">
                            <p className="text-3xl font-extrabold text-center tracking-wide mt-4 mb-8">
                                Похоже, у Вас нет любимых треков
                            </p>
                            <Button primary
                                    className="bg-white hover:bg-[#1cb955] w-[200px]"
                                    onClick={() => document.querySelector('nav a:nth-child(2)').click()}>
                                Добавить
                            </Button>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default Favorite;