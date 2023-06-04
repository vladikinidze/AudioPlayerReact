import FooterListItem from "./FooterListItem";
import BugReport from "../../BugReport";

function FooterList({modal}) {
    const menu = [
        {
            title: "Сообщить об ошибке",
            action: (event) => {
                event.preventDefault();
                modal.open(<BugReport modalClose={modal.close}/>);
            },
        }
    ];
    return (
        <ul>
            {menu.map(({title, action}) => (
                <FooterListItem key={title} onClick={action}>
                    {title}
                </FooterListItem>
            ))}
        </ul>
    );
}

export default FooterList;