import classes from "./Range.module.css"
import {useRef, useState} from "react";

function Range({min = 0, max = 100}) {
    const progressRef = useRef();
    const [progress, setProgress] = useState(0);

    function changeValue(value) {
        setProgress(value);
        progressRef.current.style.width = value + '%';
    }

    return (
        <div className={classes.sliderContainer}>
            <span className={classes.bar}>
                <span ref={progressRef}
                      className={classes.fill}></span>
            </span>
            <input id="slider"
                   onInput={(event) => changeValue(event.target.value)}
                   className={classes.slider}
                   type="range"
                   onDoubleClick={() => console.log()}
                   onChange={(event) => changeValue(event.target.value)}
                   min={0}
                   max={100}
                   value={progress}
                   step="1"/>
        </div>
    );
}

export default Range;