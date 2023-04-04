import {Bars3CenterLeftIcon} from "@heroicons/react/24/outline";
import Volume from "./Volume";
import {useState} from "react";
import Range from 'react-range-progress';

function MusicPanel() {
    // const rangeRef = useRef();
    const [value, setValue] = useState(0);
    // const {value, setValue} = useRange(rangeRef);
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
                    setVolume={val => setValue(val)}/>
            <div className="grow">
                <Range value={value}
                       thumbSize={10}
                       height={5}
                       width="100%"
                       onChange={val => setValue(val)}
                       thumbColor={{
                           r: 28,
                           g: 185,
                           b: 85,
                           a: 1,
                       }}
                       fillColor={{
                           r: 179,
                           g: 179,
                           b: 179,
                           a: 1,
                       }}
                       trackColor={{
                           r: 56,
                           g: 56,
                           b: 56,
                           a: 1,
                       }}
                />
            </div>

        </div>
    );
}

export default MusicPanel;