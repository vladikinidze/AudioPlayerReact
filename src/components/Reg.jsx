import Input from "./UI/Input";
import {TfiEmail} from "react-icons/tfi";
import Password from "./UI/Password";
import Button from "./UI/Button";
import {MdOutlineSubtitles} from "react-icons/md";
import Auth from "./Auth";
import {useState} from "react";
import useFetching from "../hooks/useFetching";
import UserService from "../API/UserService";
import Switch from "./UI/Switch/Switch";
import {SET_EMAIL, SET_GUID, SET_IMAGE, SET_USERNAME} from "../actions/userActions";
import {useDispatch} from "react-redux";
import Error from "./Error";

function Reg({openModal, onClose}) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [needRemember, setNeedRemember] = useState(false);
    const [register, isRegisterLoading, registerError] = useFetching(async () => {
        await UserService.register(username, email, password, confirmPassword);
        const responseLogin = await UserService.login(email, password);
        const responseUser = await UserService.getById(responseLogin.userId);
        dispatch({type: SET_GUID, payload: responseUser.id});
        dispatch({type: SET_EMAIL, payload: responseUser.email});
        dispatch({type: SET_IMAGE, payload: responseUser.image});
        dispatch({type: SET_USERNAME, payload: responseUser.username});
        if (needRemember) {
            localStorage.setItem("auth", JSON.stringify(responseLogin));
        } else {
            sessionStorage.setItem("auth", JSON.stringify(responseLogin));
        }
        onClose();
    });

    function setAuthModal() {
        openModal(<Auth openModal={openModal} onClose={onClose}/>);
    }

    function onNeedRememberChanged(need) {
        setNeedRemember(need);
    }

    return (
        <div className="flex flex-col justify-center text-white overflow-hidden items-center">
            <p className="text-4xl font-extrabold text-center mb-8">Создайте новый аккаунт.</p>
            {registerError &&
                <Error message={registerError?.data.error}/>
            }
            <Input type="text" className="my-2 w-full" placeHolder="Username" value={username} onInput={setUsername}>
                <MdOutlineSubtitles className="w-7 h-7"/>
            </Input>
            <Input type="text" className="my-2 w-full" placeHolder="Email" value={email} onInput={setEmail}>
                <TfiEmail className="w-6 h-6 mr-0.5"/>
            </Input>
            <Password className="my-2 w-full" placeholder="Password" value={password} onInput={setPassword}/>
            <Password className="my-2 w-full" placeholder="Confirm password" value={confirmPassword}
                      onInput={setConfirmPassword}/>
            <Button primary className="bg-white text-[15px] w-11/12  mt-5 mb-6 h-[45px] hover:scale-105"
                    onClick={register}>
                Зарегистрироваться
            </Button>
            <div className="flex flex-row mb-6 items-center">
                <p className="text-center tracking-wide mr-4">Запомнить меня</p>
                <Switch onChange={onNeedRememberChanged}/>
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className="text-center mr-4">Уже есть аккаунт?</p>
                <button className="underline uppercase hover:text-[#1cb955]" onClick={setAuthModal}>
                    Войти
                </button>
            </div>
        </div>
    );
}

export default Reg;