import {forwardRef} from "react";

function Image({url, setColor}, ref) {

    return (
        <img src={url}
             ref={ref}
             className="rounded shadow-lg"
             alt=""
        />
    );
}

export default forwardRef(Image);