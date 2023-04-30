import {useRef} from "react";

function Track({id, index, title, author, duration, imageUrl}) {

    const trackRef = useRef();
    function onClickHandle(event) {
    }

    return (
        <div ref={trackRef}
             onClick={onClickHandle}
             className="flex flex-row items-center justify-start my-0.5 h-[50px] rounded hover:bg-[#A0A0A0]">
            <p className="mx-6 font-bold w-4 tracking-wide">{index}</p>
            <p className="mx-6 grow tracking-wide">{title}</p>
            <p className="mx-6 tracking-wide">{duration}</p>
        </div>
    );
}

export default Track;