import FooterListItem from "./FooterListItem";

function FooterList() {
    const menu = [
        {
            title: "Cookies"
        },
        {
            title: "Privacy"
        }];
    return (
        <ul>
            {menu.map(({title}) => (
                <FooterListItem key={title}>
                    {title}
                </FooterListItem>
            ))}
        </ul>
    );
}

export default FooterList;