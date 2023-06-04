import {forwardRef, useEffect, useRef, useState} from 'react';
import {FaPause, FaPlay} from "react-icons/fa";
import {getFormatTime} from "../../utils";
import {useSelector} from "react-redux";
import Range from "./Range/Range"
import useRange from "../../hooks/useRange";

function Audio({className}, ref) {
    const [duration, setDuration] = useState();
    const [isPaused, setIsPaused] = useState(true);
    const [current, setCurrent] = useState(0);
    useSelector(state => state.player);
    const progressRef = useRef();
    const progress = useRange(0);
    const volumeRef = useRef();
    const volume = useRange(100);

    useEffect(() => {
        ref.current.onloadeddata = async () => {
            await setDuration(ref.current?.duration);
        }

        ref.current.ontimeupdate = () => {
            setCurrentTime(ref.current?.currentTime)
        }
        ref.current.onended = () => {
            ref.current.currentTime = 0;
            setIsPaused(true);
        }
    })

    useEffect(() => {
        if (ref.current) {
            progress.onChange(current, setCurrentTime)
        }
    }, [current])

    function setCurrentTime(time) {
        if (ref.current && ref.current?.currentTime) {
            if (Math.abs(ref.current?.currentTime - time) > 1) {
                ref.current.currentTime = time;
            }
        }
        setCurrent(time)
    }

    useEffect(() => {
        if (volume.value) {
            ref.current.volume = volume.value / 100;
        }
    }, [volume.value])

    function play() {
        if (ref.current.paused) {
            ref.current.play();
            setIsPaused(false);
        } else {
            ref.current.pause();
            setIsPaused(true);
        }
    }

    return (
        <div className={`w-full flex flex-row items-center rounded overflow-hidden ${className}`}>
            <audio id="audio" ref={ref}/>
            <div onDoubleClick={play}
                 className={`w-full flex flex-row items-center w-[440px] justify-start h-[50px] rounded hover:bg-[#686868]`}>
                <div className="ml-3 mr-3 w-full flex flex-row items-center font-bold rounded tracking-wide">
                    <div className="mx-2">
                        {isPaused
                            ? <FaPause className="fill-white -ml-[3px] hover:fill-[#1cb955]" onClick={play}/>
                            : <FaPlay className="-ml-[3px] fill-[#1cb955]" onClick={play}/>
                        }
                    </div>
                    <Range ref={progressRef}
                           min={0}
                           max={duration}
                           initValue={0}
                           setValue={setCurrentTime}
                           value={progress.value}
                           onChange={progress.onChange}
                           className="ml-2 w-full"/>
                </div>
                <p className="text-sm tracking-wide">{getFormatTime(current)}/{getFormatTime(duration)}</p>
                <Range ref={volumeRef}
                       min={0}
                       max={100}
                       value={volume.value}
                       initValue={100}
                       setValue={(n) => {
                       }}
                       onChange={volume.onChange}
                       className="ml-2 mr-3 w-[50%]"/>
            </div>
        </div>
    );
}

export default forwardRef(Audio);