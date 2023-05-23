import {MdErrorOutline} from "react-icons/md";


function Error({message, code}) {
    return (
        <div className="flex flex-row bg-[#E32636] mb-3 w-full rounded items-center">
            <MdErrorOutline className="w-6 h-6 m-3"/>
            <p className="tracking-wide mr-3 select-none">{code}</p>
            <p className="tracking-wide text-sm select-none w-4/5 mr-3">{message}</p>
        </div>
    );
}

export default Error;