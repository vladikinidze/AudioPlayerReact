import {useEffect, useState} from 'react';
import useEvent from "./useEvent";

function UseRange(ref) {
    const [range, setRange] = useState();
    useEvent('input', setValue, false, ref);

    function setValue(value) {
        if (value === range) {
            return;
        }
        setRange(value);
        ref.current.value = range;
        ref.current.style.setProperty('--value', ref.current.value);

    }

    useEffect(() => {
        ref.current.style.setProperty('--value', ref.current.value);
        ref.current.style.setProperty('--min', ref.current.min === '' ? '0' : ref.current.min);
        ref.current.style.setProperty('--max', ref.current.max === '' ? '100' : ref.current.max);
    })

    return {
        range,
        setValue
    };
}

export default UseRange;