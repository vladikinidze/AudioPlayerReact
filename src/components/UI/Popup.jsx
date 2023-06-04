import Button from "./Button";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import PopupTriangle from "./PopupTriangle";
import usePosition from "../../hooks/usePopupPosition";
import useAwayClick from "../../hooks/useAwayClick";
import Auth from "../Auth";

function Popup({openModal, closeModal}, ref) {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const nodeRef = useRef();
    const {
        move,
        target,
        setTarget,
        isSmallScreen
    } = usePosition(nodeRef, hide);
    const [classes, setClasses] = useState(getHiddenClasses);
    useAwayClick(nodeRef, hide, shouldHide);
    useImperativeHandle(ref, () => ({show}));

    function shouldHide(event) {
        return !target?.parentNode.contains(event.target);
    }

    function getHiddenClasses() {
        const translateClass = isSmallScreen ? 'translate-y-1' : 'translate-x-1';
        return `opacity-0 ${translateClass} pointer-events-none`;
    }

    function show(title, description, nextTarget, offset) {
        if (target === nextTarget) {
            return;
        }
        move(nextTarget, offset);
        setTitle(title);
        setDescription(description);
        setClasses('');
    }

    function hide() {
        setTarget(null);
        setClasses(getHiddenClasses);
    }

    function showAuthModal() {
        setTarget(null);
        setClasses(getHiddenClasses);
        openModal(<Auth openModal={openModal} onClose={closeModal}/>);
    }

    return (
        <div ref={nodeRef}
             className={`fixed z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 w-[330px] transition duration-500 select-none ${classes}`}>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-base font-medium">{description}</p>
            <div className="mt-6 text-right">
                <Button onClick={hide} className="hover:scale-105">
                    Не сейчас
                </Button>
                <Button primary onClick={showAuthModal} className="bg-white hover:scale-105">
                    Вход
                </Button>
            </div>
            <PopupTriangle side={isSmallScreen ? 'top' : 'left'}/>
        </div>
    );
}

export default forwardRef(Popup);