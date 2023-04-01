import "./Range.css"
import {forwardRef} from "react";

function Range({className, min = 0, max = 100, value, setValue}, ref) {

    function changeValue(newValue) {
        setValue(newValue);
    }

    return (
        <input ref={ref}
               className={`grow accent-[#1CB955] ${className}`}
               type="range"
               onDoubleClick={() => console.log()}
               onChange={(event) => changeValue(event.target.value)}
               min={min}
               max={max}
               value={value}
               step="1"/>
    );
}

export default forwardRef(Range);