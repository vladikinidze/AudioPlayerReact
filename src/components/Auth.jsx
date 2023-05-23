import Input from "./UI/Input";
import {TfiEmail} from "react-icons/tfi";
import Password from "./UI/Password";
import Button from "./UI/Button";
import Reg from "./Reg";
import Error from "./Error";
import {useState} from "react";

function Auth({openModal}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function setRegModal() {
        openModal(<Reg openModal={openModal}/>);
    }

    function login() {

    }

    return (
        <div className="flex flex-col justify-center text-white overflow-hidden items-center">
            <p className="text-4xl font-extrabold text-center tracking-wide mb-8">Чтобы продолжить, войдите в аккаунт.</p>
            {/*<Error message="" code="" />*/}
            <Input type="text" className="my-2 w-full" placeHolder="Email" onInput={setEmail}>
                <TfiEmail className="w-6 h-6 mr-0.5"/>
            </Input>
            <Password className="my-2 w-full" placeholder="Password" onInput={setPassword}/>
            <Button primary className="bg-gray-300 text-[15px] w-full mt-5 mb-6 h-[45px] tracking-wide hover:bg-white" onClick={login}>
                Войти
            </Button>
            <div className="flex flex-row justify-between items-center">
                <p className="text-center tracking-wide mr-4">Нет аккаунта?</p>
                <button className="underline uppercase hover:text-[#1cb955]" onClick={setRegModal}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
}

export default Auth;