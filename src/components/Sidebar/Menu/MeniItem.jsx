import {useRef} from "react";

function MeniItem({href, className, icon, onClick, children: text}) {
    const textRef = useRef();

    function actionHandle(event) {
        if (!onClick) {
            return;
        }
        event.preventDefault();
        onClick(textRef.current);
    }

    return (
        <a href={href} className={className} onClick={actionHandle}>
            {icon}
            <span ref={textRef} className="ml-4 mt-1 text-base font-semibold">{text}</span>
        </a>
    );
}

export default MeniItem;
