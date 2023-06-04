import {Link} from "react-router-dom";

function Description({data}) {
    return (
        // <Link to={`/users/${data.id}`}
        //    className="text-sm text-[#b3b3b3] tracking-wide hover:underline">
        //     {data.username}
        // </Link>
        <p className="text-sm cursor-default text-[#b3b3b3]">
            {data.username}
        </p>
    );
}

export default Description;