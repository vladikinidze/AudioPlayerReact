import Input from "./UI/Input";
import {TfiEmail} from "react-icons/tfi";
import Password from "./UI/Password";
import Button from "./UI/Button";
import Reg from "./Reg";
import Error from "./Error";
import Switch from "./UI/Switch/Switch";
import {useState} from "react";
import useFetching from "../hooks/useFetching";
import UserService from "../API/UserService";
import {useDispatch} from "react-redux";
import {
    SET_EMAIL, SET_FAVORITE_PLAYLIST,
    SET_GUID, SET_IMAGE,
    SET_USERNAME
} from "../actions/userActions";
import {SET_EXPLICIT} from "../actions/appActions";

function Auth({openModal, onClose}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [needRemember, setNeedRemember] = useState(false);

    const [login, isLoading, error] = useFetching(async () => {
        const responseLogin = await UserService.login(email, password);
        const responseUser = await UserService.getById(responseLogin.userId);
        dispatch({type: SET_GUID, payload: responseUser.id});
        dispatch({type: SET_EMAIL, payload: responseUser.email});
        dispatch({type: SET_IMAGE, payload: responseUser.image});
        dispatch({type: SET_USERNAME, payload: responseUser.username});
        dispatch({type: SET_FAVORITE_PLAYLIST, payload: responseUser.favoritePlaylistId});
        if (needRemember) {
            localStorage.setItem("auth", JSON.stringify(responseLogin));
        } else {
            sessionStorage.setItem("auth", JSON.stringify(responseLogin));
        }
        const responseSettings = await UserService.getSettings();
        dispatch({type: SET_EXPLICIT, payload: responseSettings.explicit});
        onClose();
    })

    function onNeedRememberChanged(need) {
        setNeedRemember(need);
    }

    function setRegModal() {
        openModal(<Reg openModal={openModal} onClose={onClose}/>);
    }

    return (
        <div className="flex flex-col justify-center text-white overflow-hidden items-center">
            <p className="text-4xl font-extrabold text-center tracking-wide mb-8">
                Чтобы продолжить, войдите в аккаунт.
            </p>
            {error &&
                <Error message={error?.data.error}/>
            }
            <Input type="text"
                   value={email}
                   className="my-2 w-full"
                   placeHolder="Email"
                   onInput={setEmail}>
                <TfiEmail className="w-6 h-6 mr-0.5"/>
            </Input>
            <Password className="my-2 w-full"
                      value={password}
                      placeholder="Password"
                      onInput={setPassword}/>
            <Button primary
                    className="bg-white text-[15px] w-11/12 mt-5 mb-4 h-[45px] tracking-wide"
                    onClick={login}>
                Войти
            </Button>
            <div className="flex flex-row mb-6 items-center">
                <p className="text-center tracking-wide mr-4">Запомнить меня</p>
                <Switch onChange={onNeedRememberChanged}/>
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className="text-center tracking-wide mr-4">Нет аккаунта?</p>
                <button className="underline uppercase hover:text-[#1cb955]"
                        onClick={setRegModal}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
}

export default Auth;