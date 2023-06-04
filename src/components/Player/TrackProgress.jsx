import {forwardRef, useEffect} from "react";
import Range from "../UI/Range/Range";
import {useSelector} from "react-redux";
import {getFormatTime} from "../../utils";


function TrackProgress({setValue, trackProgress}, ref) {
    const player = useSelector(state => state.player);

    useEffect(() => {
        trackProgress.onChange(player.currentTime, setValue);
    }, [player.currentTime])

    return (
        <div className="flex flex-row flex-1">
            <p className="mr-2 text-xs mt-1 text-[#b3b3b3] line-clamp-2 tracking-wide">{getFormatTime(player.currentTime)}</p>
            <Range ref={ref}
                   className="grow"
                   onChange={trackProgress.onChange}
                   setValue={setValue}
                   value={trackProgress.value}
                   initValue={0}
                   min={0}
                   max={player.duration}/>
            <p className="ml-2 text-xs mt-1 text-[#b3b3b3] line-clamp-2 tracking-wide">{getFormatTime(player.duration)}</p>
        </div>
    );
}

export default forwardRef(TrackProgress);