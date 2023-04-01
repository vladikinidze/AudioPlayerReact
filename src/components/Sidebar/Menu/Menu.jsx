import {
    HomeIcon,
    MagnifyingGlassIcon,
    ViewColumnsIcon,
    PlusCircleIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import MeniItem from "./MeniItem";

function Menu({showPopup}) {
    const activeMenuItem = "flex items-center text-white bg-[#282828] mx-2 px-4 py-2 rounded";
    const menuItem = "flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300";
    const menu = [
        {
            href: "/",
            className: activeMenuItem,
            icon: <HomeIcon className="h-7 w-7"/>,
            text: "Главная"
        },
        {
            href: "/",
            className: menuItem,
            icon: <MagnifyingGlassIcon className="h-7 w-7"/>,
            text: "Поиск"
        },
        {
            href: "/",
            className: `${menuItem} mb-6`,
            icon: <ViewColumnsIcon className="h-7 w-7"/>,
            text: "Медиатека",
            action: (target) => {
                showPopup(
                    'Сохраняйте в медиатеку',
                    'Войдите, чтобы увидеть сохраненные песни и альбомы',
                    target
                );
            },
        },
        {
            href: "/",
            className: menuItem,
            icon: <PlusCircleIcon className="h-7 w-7"/>,
            text: "Создать плейлист",
            action: (target) => {
                showPopup(
                    'Создавайте плейлисты',
                    'Войдите, чтобы создать плейлист',
                    target,
                );
            },
        },
        {
            href: "/",
            className: menuItem,
            icon: <HeartIcon className="h-7 w-7"/>,
            text: "Любимая музыка",
            action: (target) => {
                showPopup(
                    'Слушайте любимую музыку',
                    'Войдите, чтобы увидеть Ваши любимые песни и альбомы',
                    target
                );
            },
        },
    ];
    return (
        <nav>
            {menu.map(({href, className, icon, text, action}) => (
                <MeniItem href={href} className={className} icon={icon} key={text} onClick={action}>
                    {text}
                </MeniItem>
            ))}
        </nav>
    );
}

export default Menu;
