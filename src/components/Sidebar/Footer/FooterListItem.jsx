import {Link} from "react-router-dom";

function FooterListItem({children: text, onClick}) {
    return (
        <li>
            <Link to="/"
                  className="text-[11px] hover:underline py-2"
                  onClick={onClick}>
                {text}
            </Link>
        </li>
    );
}

export default FooterListItem;