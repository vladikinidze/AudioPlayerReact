import {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";

function MenuItem({href, className, icon, onClick, setActive, onClose, children: text}) {
    const textRef = useRef();
    const navigate = useNavigate();
    function actionHandle(event) {
        setActive();
        if (onClose) {
            onClose();
        }
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
