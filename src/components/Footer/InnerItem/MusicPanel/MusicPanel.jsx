import {Bars3CenterLeftIcon} from "@heroicons/react/24/outline";
import Range from "../../../UI/Range/Range";
import Volume from "./Volume";
import useRange from "../../../../hooks/useRange";
import {useRef, useState} from "react";

function MusicPanel() {
    const rangeRef = useRef();
    const {value, setValue} = useRange(rangeRef);
    const [active, setActive] = useState(true);

    function toggleVolume(on) {
        if (on === active) {
            return
        }
        setActive(on);
    }

    return (
        <div className="flex flex-row items-center w-[250px] p-3">
            <Bars3CenterLeftIcon className="w-5 h-5 hover:stroke-[#1cb955]"/>
            <Volume value={value}
                    active={active}
                    setActive={toggleVolume}
                    setVolume={setValue}/>
            <Range ref={rangeRef}
                   value={value}
                   setValue={setValue}/>
        </div>
    );
}

export default MusicPanel;