function FooterListItem({children: text}) {
    return (
        <li>
            <a href="/" className="text-[11px] hover:underline py-2">{text}</a>
        </li>
    );
}

export default FooterListItem;