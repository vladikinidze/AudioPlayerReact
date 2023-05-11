import {useState} from 'react';

function UseRange({initValue}) {
    const [value, setValue] = useState(initValue);
    function onChange(value, callback) {
        setValue(value);
        callback(value);
    }

    return {
        value,
        onChange
    };
}

export default UseRange;