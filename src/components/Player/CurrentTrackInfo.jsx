import {useNavigate} from "react-router-dom";
import {BiHeart} from "react-icons/bi";

function CurrentTrackInfo({image, artist, title}) {
    const navigate = useNavigate();
   function onClickHandle() {
        navigate(`/${artist}`)
    }

    return (
        <div className="flex flex-row items-center w-[250px]">
            <img src={image} className="w-[65px] h-[65px] rounded-sm mt-0.5" alt=""/>
            <div className="flex flex-col mx-5 justify-center">
                <p className="text-sm font-semibold text-white mb-px">
                    {title}
                </p>
                <p className="text-xs font-light text-[#b3b3b3] hover:underline capitalize cursor-pointer"
                    onClick={onClickHandle}>
                    {artist}
                </p>
            </div>
            <BiHeart className="w-6 h-6 fill-[#b3b3b3] hover:fill-[#1cb955]"/>
        </div>
    );
}

export default CurrentTrackInfo;