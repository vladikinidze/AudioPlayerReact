import {MdErrorOutline} from "react-icons/md";


function Error({message, code, className}) {
    return (
        <div className={`flex flex-row bg-[#E32636] mb-3 py-2 w-full rounded items-center ${className}`}>
            <MdErrorOutline className="w-6 h-6 m-3"/>
            <p className="tracking-wide text-base select-none w-4/5 mr-3">{message}</p>
        </div>
    );
}

export default Error;