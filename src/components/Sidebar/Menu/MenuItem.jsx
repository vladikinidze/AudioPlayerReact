import {useRef} from "react";
import {Link} from "react-router-dom";

function MenuItem({href, className, icon, onClick, setActive, children: text}) {
    const textRef = useRef();

    function actionHandle(event) {
        setActive();
        if (!onClick) {
            return;
        }
        event.preventDefault();
        onClick(textRef.current);
    }

    return (
        <Link to={href} className={className} onClick={actionHandle}>
            {icon}
            <span ref={textRef} className="ml-4 mt-1 text-base font-semibold">{text}</span>
        </Link>
    );
}

export default MenuItem;
