import {getFormatDate} from "../utils";
import {Link} from "react-router-dom";

function PlaylistUserCard({playlist}) {
    return (
        <div className="pl-8 pr-6 flex flex-col justify-end overflow-hidden h-[230px]">
            <p className="text-ellipsis overflow-hidden font-extrabold mb-3 mt-1.5 tracking-wide 5xl:text-7xl 4xl:text-7xl 3xl:text-7xl 2xl:text-5xl xl:text-4xl lg:text-2xl sidebarHide:text-2xl md:text-3xl sm:text-2xl 2l:text-2xl l:text-xl ">{playlist.title}</p>
            <Link to={`/users/${playlist.user.id}`} className="font-medium text-lg py-1 tracking-wide cursor-pointer hover:underline">
                {playlist.user.username}
            </Link>
            <p className="font-bold text-[#b3b3b3] text-base tracking-wide">{getFormatDate(playlist.created)}</p>
        </div>
    );
}

export default PlaylistUserCard;