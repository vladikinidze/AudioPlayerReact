import classes from "./Range.module.css"
import {forwardRef, useEffect, useRef} from "react";

function Range({className, value: range, onChange, setValue, initValue, max = 100, min = 0}, ref) {
    const progressRef = useRef();

    useEffect(() => {
        if (initValue) {
            setStyleProgress(initValue);
        }
    }, [initValue])

    useEffect(() => {
        setStyleProgress(range);
    }, [range])

    function setStyleProgress(value) {
        progressRef.current.style.width = 100 * value / max + '%';
    }

    function changeValue(value) {
        onChange(value, setValue);
    }

    return (
        <div className={`${classes.sliderContainer} ${className}`}>
            <span className={classes.bar}>
                <span ref={progressRef}
                      className={classes.fill}>
                </span>
            </span>
            <input ref={ref}
                   className={classes.slider}
                   type="range"
                   onChange={(event) => changeValue(event.target.value)}
                   //onInput={(event) => changeValue(event.target.value)}
                   min={min}
                   max={max}
                   value={range ?? initValue}
                   step="1"/>
        </div>
    );
}

export default forwardRef(Range);