import {MdCheckCircleOutline} from "react-icons/md";

function Success({message, code, className}) {
    return (
        <div className={`flex flex-row bg-[#1cb955] mb-3 py-2 w-full rounded items-center ${className}`}>
            <MdCheckCircleOutline className="w-6 h-6 m-3"/>
            <p className="tracking-wide text-base select-none w-4/5 mr-3">{message}</p>
        </div>
    );
}

export default Success;