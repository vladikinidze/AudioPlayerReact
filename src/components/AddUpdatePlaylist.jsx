import FileUpload from "./UI/FileUpload/FileUpload";
import {VscDiffAdded} from "react-icons/vsc";
import useFileUpload from "../hooks/useFileUpload";
import Input from "./UI/Input";
import Switch from "./UI/Switch/Switch";
import {useEffect, useState} from "react";
import Button from "./UI/Button";
import useFetching from "../hooks/useFetching";
import PlaylistService from "../API/PlaylistService";
import {useNavigate} from "react-router-dom";
import Error from "./Error";
import UserService from "../API/UserService";
import {SET_GUID} from "../actions/userActions";
import {useDispatch} from "react-redux";
import {plug} from "../API/Path/path";
import FileService from "../API/FileService";

function AddUpdatePlaylist({modalClose, playlist = null, changed, isFavorite}) {
    const fileUpload = useFileUpload();
    const [isPrivate, setIsPrivate] = useState(playlist?.private ?? false);
    const [title, setTitle] = useState(playlist?.title ?? "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [clearVisible, setClearVisible] = useState(() => {
        if (playlist) {
            return playlist?.image !== plug;
        } else {
            return fileUpload.file !== FileService.getFile(plug);
        }
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

    const [fetch, isLoading, fetchError] = useFetching(async () => {
        if (playlist) {
            const response = await PlaylistService.update(playlist?.id, title, isPrivate, fileUpload.file, fileUpload.file === FileService.getFile(plug))

            changed(prev => !prev);
        } else {
            const response = await PlaylistService.create(title, isPrivate, fileUpload.file);
            navigate(`/playlists/${response}`);
        }
        modalClose();
    });

    useEffect(() => {
        if (fetchError) {
            if (fetchError.status === 401) {
                refreshToken();
                fetch();
            }
        }
    }, [fetchError])

    function onChanged(isPrivate) {
        setIsPrivate(isPrivate)
    }

    return (
        <div className="flex flex-col justify-center text-white overflow-hidden items-center">
            <p className="text-4xl font-extrabold text-center tracking-wide mb-8">
                {playlist ? "Обновление плейлиста." : "Создание плейлиста."}
            </p>
            {fetchError && fetchError?.status !== 401 &&
                <Error message={fetchError.data.error}/>
            }
            <FileUpload icon={<VscDiffAdded className="w-12 h-12"/>}
                        fileUpload={fileUpload}
                        type="image"
                        callback={(_) => setClearVisible(true)}
                        filepath={playlist?.image ?? plug}
                        wrapperClassName="mb-8"/>
            <Button className={`mb-4 ${clearVisible ? "flex" : "hidden"}`}
                    onClick={() => {
                        setClearVisible(false);
                        fileUpload.upload(FileService.getFile(plug));
                    }}>
                Убрать картинку
            </Button>
            {!isFavorite && <Input className="rounded w-full mb-4"
                                   value={title}
                                   placeHolder="Название"
                                   onInput={setTitle}/>}
            <div className="flex flex-row items-center justify-center mb-8"
                 onClick={() => setIsPrivate(prev => !prev)}>
                <p className="text-center text-lg tracking-wide mr-4 cursor-pointer">
                    Приватный плейлист
                </p>
                <Switch value={isPrivate} onChange={onChanged}/>
            </div>
            <div className="flex flex-row items-center justify-center mb-2">
                <Button onClick={() => modalClose()}>
                    Отмена
                </Button>
                <Button primary className="bg-gray-100 hover:bg-[#1cb955] hover:text-white" onClick={fetch}>
                    {playlist ? "Сохранить" : "Создать"}
                </Button>
            </div>
        </div>
    );
}

export default AddUpdatePlaylist;