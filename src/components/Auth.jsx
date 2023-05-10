import Input from "./UI/Input";
import {TfiEmail} from "react-icons/tfi";
import Password from "./UI/Password";

function Auth() {
    return (
        <div className="">
            <p className="text-4xl font-extrabold">Чтобы продолжить, войдите в аккаунт.</p>
            <Input type="text" className="my-2" placeHolder="Email">
                <TfiEmail className="w-6 h-6 mr-0.5"/>
            </Input>
            <Password className="my-2"/>
        </div>
    );
}

export default Auth;