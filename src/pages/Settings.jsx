import Switch from "../components/UI/Switch/Switch";
import {useEffect, useState} from "react";
import Button from "../components/UI/Button";
import useFetching from "../hooks/useFetching";
import UserService from "../API/UserService";
import {useDispatch, useSelector} from "react-redux";
import {SET_EXPLICIT} from "../actions/appActions";
import {useNavigate} from "react-router-dom";
import Success from "../components/Success";
import Error from "../components/Error";
import {SET_GUID} from "../actions/userActions";
import {BsExplicit} from "react-icons/bs";

function Settings({averageBackgroundColor}) {
    const app = useSelector(state => state.app);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [explicit, setExplicit] = useState(app.explicit);
    const dispatch = useDispatch();
    const [saveVisible, setSaveVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [saveSettings, saveLoading, saveError] = useFetching(async () => {
        const response = await UserService.postSettings(explicit);
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false);
        }, 2000)
        setSaveVisible(false);
        dispatch({type: SET_EXPLICIT, payload: explicit});
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
        saveSettings();
    });

    function explicitChanged(explicit) {
        setExplicit(explicit);
        setSaveVisible(true);
    }

    useEffect(() => {
        if (!user?.guid) {
            navigate("/")
        }
    }, [user])

    useEffect(() => {
        if (saveError) {
            if (saveError.status === 401) {
                refreshToken();
            }
        }
    }, [saveError])

    useEffect(() => {
        averageBackgroundColor.setColor("#121212")
    }, [])

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <div className="flex flex-row items-stretch mb-11">
                    <h2 className="text-3xl font-semibold">
                        Настройки
                    </h2>
                </div>
                {saveError && saveError?.status !== 401 &&
                    <Error message={saveError.data.error}/>
                }
                {success && <Success message="Настройки сохранены."/>}
                <div className="flex flex-row items-center justify-between w-full border-y border-[#505050] px-6 py-8">
                    <p className="text-lg mb-1 flex flex-row items-center">
                        Выключить контент для взрослых
                        <BsExplicit className="ml-2"/>
                    </p>
                    <Switch value={explicit}
                            onChange={explicitChanged}/>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end w-full">
                {saveVisible &&
                    <Button primary
                            className="bg-[#1cb955] text-white m-4"
                            onClick={saveSettings}>
                        Сохранить
                    </Button>
                }
            </div>
        </div>
    );
}

export default Settings;