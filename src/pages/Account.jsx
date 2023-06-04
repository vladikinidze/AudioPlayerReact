import {useEffect, useRef, useState} from "react";
import useFetching from "../hooks/useFetching";
import UserService from "../API/UserService";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import FileService from "../API/FileService";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import useFileUpload from "../hooks/useFileUpload";
import Error from "../components/Error";
import {VscDiffAdded} from "react-icons/vsc";
import Image from "../components/UI/Image";
import {plug} from "../API/Path/path";
import Success from "../components/Success";
import {SET_EMAIL, SET_GUID, SET_IMAGE, SET_USERNAME} from "../actions/userActions";

function Account({showPopup, showNotify, modal, averageBackgroundColor, toggleScrolling}) {
    const user = useSelector(state => state.user);
    const imageRef = useRef();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileUpload = useFileUpload();
    const [saveVisible, setSaveVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [clearVisible, setClearVisible] = useState(false);
    const [saveUser, saveLoading, saveError] = useFetching(async () => {
        const response = await UserService.update(username, email, fileUpload.file, fileUpload.file === FileService.getFile(plug));
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false);
        }, 2000)
        setSaveVisible(false);
        const responseUser = await UserService.getById(user.guid);
        dispatch({type: SET_GUID, payload: responseUser.id});
        dispatch({type: SET_EMAIL, payload: responseUser.email});
        dispatch({type: SET_IMAGE, payload: responseUser.image});
        dispatch({type: SET_USERNAME, payload: responseUser.username});
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
        saveUser();
    });

    useEffect(() => {
        if (!(sessionStorage.getItem("auth") ?? localStorage.getItem("auth"))) {
            navigate("/");
        }
        if (!user.guid) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (user.image) {
            setClearVisible(user.image !== plug);
        }
        setUsername(user.username)
        setEmail(user.email)
    }, [user])

    function setBackground() {
        averageBackgroundColor.set(imageRef);
    }

    function onChanged(event) {
        if (event.target.files[0]) {
            setSaveVisible(true);
            fileUpload.upload(event.target.files[0])
            imageRef.current.src = URL.createObjectURL(event.target.files[0]);
            setClearVisible(true);
        }
    }

    useEffect(() => {
        if (saveError) {
            if (saveError.status === 401) {
                refreshToken();
            }
        }
    }, [saveError])

    return (

        <div onLoad={setBackground}
             className="flex flex-col h-full m-3 justify-between">
            {user.guid &&
                <div>
                    <div>
                        {saveError && saveError?.status !== 401 &&
                            <Error message={saveError.data.error}/>
                        }
                        {success &&
                            <Success message="Аккаунт обновлен."/>
                        }
                    </div>
                    <div className="flex flex-row w-full">
                        <div className={`w-[200px] h-[200px] mt-1 relative flex flex-col items-center`}>
                            <Image ref={imageRef}
                                   className="min-w-[200px] min-h-[200px]"
                                   url={FileService.getFile(user?.image ?? "548864f8-319e-40ac-9f9b-a31f65ccb902.jpg")}/>
                            <div
                                className={`absolute leading-[33px] overflow-hidden left-0 bottom-0 w-[200px] h-[200px]`}>
                                <div
                                    className={`flex items-center justify-center overflow-hidden opacity-0 hover:opacity-100 w-[200px] h-[200px] innerImage`}>
                                    <input className="absolute opacity-0 w-[200px] h-[200px]"
                                           type="file"
                                           onInput={onChanged}
                                           accept=".jpg,.jpeg"
                                    />
                                    <VscDiffAdded className="w-12 h-12"/>
                                </div>
                            </div>
                            {clearVisible === true &&
                                <Button className={`mb-4`}
                                        onClick={() => {
                                            setClearVisible(false);
                                            setSaveVisible(true);
                                            imageRef.current.src = FileService.getFile(plug);
                                            fileUpload.upload(FileService.getFile(plug));
                                        }}>
                                    Убрать картинку
                                </Button>
                            }
                        </div>
                        <div className="flex flex-col justify-end w-full ml-4 mt-1">
                            <Input className="max-w-[450px]"
                                   value={username}
                                   onInput={(value) => {
                                       setSaveVisible(true);
                                       setUsername(value)
                                   }}
                                   placeHolder="Username"/>
                            {/*<Input placeHolder="Email"*/}
                            {/*       className="max-w-[450px]"*/}
                            {/*       onInput={(value) => {*/}
                            {/*           setSaveVisible(true);*/}
                            {/*           setEmail(value)*/}
                            {/*       }}*/}
                            {/*       value={email}/>*/}
                        </div>
                    </div>
                </div>
            }
            <div className="flex flex-row items-center justify-end w-full">
                {saveVisible &&
                    <Button primary
                            className="bg-[#1cb955] text-white m-4"
                            onClick={saveUser}>
                        Сохранить
                    </Button>
                }
            </div>
        </div>

    );
}

export default Account;