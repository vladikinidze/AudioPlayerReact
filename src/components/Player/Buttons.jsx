import {AiFillPlayCircle, AiFillPauseCircle} from "react-icons/ai";
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {BsRepeat, BsShuffle} from "react-icons/bs"

function Buttons({play, isPlaying}) {

    return (
        <div className="grow flex flex-row items-center justify-center mb-2">
            <BsShuffle className="w-4 h-4 mx-2.5 hover:fill-[#1cb955]"/>
            <BiSkipPrevious className="w-9 h-9 mx-2 hover:fill-[#1cb955]"/>
            {isPlaying
                ? <AiFillPlayCircle className="w-10 h-10 hover:fill-[#1cb955]" onClick={play}/>
                : <AiFillPauseCircle className="w-10 h-10 hover:fill-[#1cb955]" onClick={play}/>
            }
            <BiSkipNext className="w-9 h-9 mx-2 hover:fill-[#1cb955]"/>
            <BsRepeat className="w-4 h-4 mx-2 hover:fill-[#1cb955]"/>
        </div>
    );
}

export default Buttons;