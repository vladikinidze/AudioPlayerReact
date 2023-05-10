import {Link, useNavigate} from "react-router-dom";

function Description({data}) {

    const navigate = useNavigate();
    function onClicked(event) {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/${data.id}`);
    }

    return (
        <Link to={`/users/${data.id}`}
           className="text-sm text-[#b3b3b3] tracking-wide hover:underline">
            {data.username}
        </Link>
    );
}

export default Description;