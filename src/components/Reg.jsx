import Input from "./UI/Input";
import {TfiEmail} from "react-icons/tfi";
import Password from "./UI/Password";
import Button from "./UI/Button";
import {MdOutlineSubtitles} from "react-icons/md";
import Auth from "./Auth";
import {useState} from "react";

function Reg({openModal}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    function setAuthModal() {
        openModal(<Auth openModal={openModal}/>);
    }

    function register() {

    }

    return (
        <div className="flex flex-col justify-center text-white overflow-hidden items-center">
            <p className="text-4xl font-extrabold text-center mb-8">Создайте новый аккаунт.</p>
            <Input type="text" className="my-2 w-full" placeHolder="Username" onInput={setUsername}>
                <MdOutlineSubtitles className="w-7 h-7"/>
            </Input>
            <Input type="text" className="my-2 w-full" placeHolder="Email" onInput={setEmail}>
                <TfiEmail className="w-6 h-6 mr-0.5"/>
            </Input>
            <Password className="my-2 w-full" placeholder="Password" onInput={setPassword}/>
            <Password className="my-2 w-full" placeholder="Confirm password" onInput={setConfirmPassword}/>
            <Button primary className="bg-gray-300 text-[15px] w-full mt-5 mb-6 h-[45px] hover:bg-white" onClick={register}>
                Зарегистрироваться
            </Button>
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