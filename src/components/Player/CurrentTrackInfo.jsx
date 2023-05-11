import {Link} from "react-router-dom";
import {BiHeart} from "react-icons/bi";

function CurrentTrackInfo({image, title, user}) {
    return (
        <div className="flex flex-row items-center w-[250px]">
            <img src={`https://localhost:7182/api/files/${image}`} className="w-[65px] h-[65px] rounded-sm mt-0.5" alt=""/>
            <div className="flex flex-col mx-5 justify-center">
                <p className="text-sm font-semibold w-[150px] mb-0.5 text-white whitespace-nowrap overflow-hidden text-ellipsis">
                    {title}
                </p>
                <Link to={`/users/${user.id}`} className="text-xs font-light text-[#b3b3b3] hover:underline cursor-pointer">
                    {user.username}
                </Link>
            </div>
            {/*<BiHeart className="w-6 h-6 fill-[#b3b3b3] hover:fill-[#1cb955]"/>*/}
        </div>
    );
}

export default CurrentTrackInfo;