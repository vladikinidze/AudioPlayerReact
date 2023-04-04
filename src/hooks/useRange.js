import {useEffect, useState} from 'react';
import useEvent from "./useEvent";

function UseRange(ref) {
    console.log(ref)
    const [range, setRange] = useState(0);
    // useEvent('input', setValue, true, ref);

    function setValue(value) {
        if (value === range) {
            return;
        }
        setRange(value);
        console.log(range)
    }

    return {
        range,
        setValue
    };
}

export default UseRange;