import {useState} from "react";

function UseVolume(value) {
    const [previousVolume, setPreviousVolume] = useState(value);
    function changeVolume(on) {
        if (on) {
            setPreviousVolume(value);
        }
    }

    return {
      previousVolume,
      changeVolume
    };
}

export default UseVolume;