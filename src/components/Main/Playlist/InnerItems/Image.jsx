import {useRef} from "react";

function Image({url, setColor}) {
    const ref = useRef();
    function setAverageColor() {
        setColor(ref);
    }

    return (
        <img src={url}
             ref={ref}
             onMouseOver={setAverageColor}
             className="rounded shadow-lg"
             alt=""
        />
    );
}

export default Image;