import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute2} from "react-icons/im";
import Range from "../UI/Range/Range";
import useRange from "../../hooks/useRange";


function Volume({setVolume}) {
    const rangeRef = useRef();
    const [previousVolume, setPreviousVolume] = useState(100);
    const player = useSelector(state => state.player)
    const buttonsClasses = "fill-[#b3b3b3] hover:fill-[#1cb955]";
    const volume = useRange((sessionStorage.getItem("volume") ?? localStorage.getItem("volume")) ?? 100);

    function onClickHandle(event) {
        if (player.volume === 0) {
            volume.onChange(previousVolume, setVolume)
            setPreviousVolume(0)
        } else {
            volume.onChange(0, setVolume)
            setPreviousVolume(player.volume);
        }
    }

    return (
        <>
            <button className="w-5 h-5 mr-3 ml-5"
                    onClick={onClickHandle}>
                {player.volume > 70
                    ? <ImVolumeHigh className={`${buttonsClasses}`}/>
                    : player.volume > 40
                        ? <ImVolumeMedium className={`${buttonsClasses}`}/>
                        : player.volume > 0
                            ? <ImVolumeLow className={`${buttonsClasses}`}/>
                            : <ImVolumeMute2 className={`${buttonsClasses}`}/>
                }
            </button>
            <Range ref={rangeRef}
                   className="grow"
                   onChange={volume.onChange}
                   setValue={setVolume}
                   value={volume.value}
                   initValue={(sessionStorage.getItem("volume") ?? localStorage.getItem("volume")) ?? 100}/>
        </>
    );
}

export default Volume;