import {BiHeart} from "react-icons/bi";

function CurrentTrackInfo({image, artist, title}) {
    return (
        <div className="flex flex-row items-center w-[250px]">
            <img src={image} className="w-[65px] h-[65px] rounded-sm mt-0.5" alt=""/>
            <div className="flex flex-col mx-5 justify-center">
                <p className="text-sm font-semibold text-white mb-px">
                    {artist}
                </p>
                <p className="text-xs font-light text-[#b3b3b3] hover:underline capitalize cursor-pointer">
                    {title}
                </p>
            </div>
            <BiHeart className="w-6 h-6 hover:stroke-[#1cb955]"/>
        </div>
    );
}

export default CurrentTrackInfo;