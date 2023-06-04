import Error from "./Error";
import FileUpload from "./UI/FileUpload/FileUpload";
import Input from "./UI/Input";
import Switch from "./UI/Switch/Switch";
import Button from "./UI/Button";
import useFileUpload from "../hooks/useFileUpload";
import {useEffect, useState} from "react";
import useFetching from "../hooks/useFetching";
import TrackService from "../API/TrackService";
import {useDispatch} from "react-redux";
import UserService from "../API/UserService";
import {SET_GUID} from "../actions/userActions";

function AddUpdateTrack({playlistId, modal, changed, track = null}) {
    const fileUpload = useFileUpload();
    const [title, setTitle] = useState(track ? track?.title : "");
    const [explicit, setExplicit] = useState(track ? track?.explicit : false);
    const dispatch = useDispatch();

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
        fetch();
    });

    const [fetch, isLoading, fetchError] = useFetching(async () => {
        let duration;
        if (document.getElementById('audio')) {
            duration = String(document.getElementById('audio').duration).replace(".", ",");
        }
        if (track) {
            await TrackService.update(track.id, title, explicit, playlistId, fileUpload.file, duration);
        } else {
            await TrackService.create(title, explicit, playlistId, fileUpload.file, duration);
        }
        modal.close();
        changed(prev => !prev);
    });

    useEffect(() => {
        if (fetchError) {
            if (fetchError.status === 401) {
                refreshToken();
            }
        }
    }, [fetchError])

    function onChanged(isExplicit) {
        setExplicit(isExplicit)
    }

    return (
        <div className="flex flex-col justify-center text-white overflow-hidden items-center">
            <p className="text-4xl font-extrabold text-center tracking-wide mb-8">
                {track ? "Обновление трека." : "Добавление нового трека."}
            </p>
            {fetchError && fetchError?.status !== 401 &&
                <Error message={fetchError.data.error}/>
            }
            <FileUpload fileUpload={fileUpload}
                        filepath={track ? track?.audio : undefined}
                        wrapperClassName="mb-8 w-full"
                        type="audio"/>
            <Input className="rounded w-full mb-4"
                   placeHolder="Название"
                   value={title}
                   onInput={setTitle}/>
            <div className="flex flex-row items-center justify-center mb-8"
                 onClick={() => setExplicit(prev => !prev)}>
                <p className="text-center text-lg tracking-wide mr-4 cursor-pointer">
                    Контент для взрослых
                </p>
                <Switch value={explicit}
                        onChange={onChanged}/>
            </div>
            <div className="flex flex-row items-center justify-center mb-2">
                <Button onClick={(event) => modal.close()}>
                    Отмена
                </Button>
                <Button primary className="bg-gray-100 hover:bg-[#1cb955] hover:text-white"
                        onClick={fetch}>
                    {track ? "Сохранить" : "Добавить"}
                </Button>
            </div>
        </div>
    );
}

export default AddUpdateTrack;