import {forwardRef} from "react";

function Image({url, className}, ref) {

    return (
        <img src={url}
             ref={ref}
             className={`rounded shadow-lg ${className}`}
             crossOrigin="anonymous"
             alt=""
        />
    );
}

export default forwardRef(Image);