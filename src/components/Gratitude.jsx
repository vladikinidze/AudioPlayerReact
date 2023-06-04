import {MdOutlineHandshake} from "react-icons/md";

function Gratitude() {
    return (
        <div className="flex flex-col items-center">
            <p className="text-4xl font-extrabold text-center tracking-wide mb-8">
                Спасибо, что помогаете нам стать лучше!
            </p>
            <MdOutlineHandshake className="w-10 h-10 mb-3"/>
        </div>
    );
}

export default Gratitude;