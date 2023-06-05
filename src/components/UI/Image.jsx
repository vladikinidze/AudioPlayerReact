import {forwardRef} from "react";

function Image({url, className}, ref) {

    return (
        <img src={url}
             ref={ref}
             className={`rounded shadow-lg ${className}`}
             crossOrigin="anonymous"
             referrerPolicy="no-referrer"
             alt=""
        />
    );
}

export default forwardRef(Image);