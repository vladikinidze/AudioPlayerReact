import {forwardRef} from "react";

function Image({url, setColor, className}, ref) {

    return (
        <img src={url}
             ref={ref}
             className={`rounded shadow-lg ${className}`}
             alt=""
        />
    );
}

export default forwardRef(Image);