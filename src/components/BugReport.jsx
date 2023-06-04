import Error from "./Error";
import Button from "./UI/Button";
import TextArea from "./UI/TextArea";
import {useState} from "react";
import useFetching from "../hooks/useFetching";
import UserService from "../API/UserService";
import Gratitude from "./Gratitude";


function BugReport({modalClose}) {
    const [errorText, setErrorText] = useState();
    const [sent, setSent] = useState(false);
    const [send, sendLoading, sendError] = useFetching(async () => {
        await UserService.report(errorText);
        setSent(true);
    });

    if (sent) {
        return (
            <div className="flex flex-col justify-center text-white overflow-hidden items-center">
                <Gratitude/>
                <div className="flex flex-row items-center justify-center mb-2">
                    <Button onClick={() => modalClose()}>
                        Закрыть
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center text-white overflow-hidden items-center">
            <p className="text-4xl font-extrabold text-center tracking-wide mb-8">
                Сообщить об ошибке
            </p>
            {sendError &&
                <Error message={sendError.data.error}/>
            }

            <TextArea text={errorText}
                      onChanged={setErrorText}
                      placeHolder="Сообщение"
                      className="w-full mb-5"/>

            <div className="flex flex-row items-center justify-center mb-2">
                <Button onClick={() => modalClose()}>
                    Отмена
                </Button>
                <Button primary className="bg-gray-100 hover:bg-[#1cb955] hover:text-white"
                        onClick={send}>
                    Сообщить
                </Button>
            </div>
        </div>
    );
}

export default BugReport;