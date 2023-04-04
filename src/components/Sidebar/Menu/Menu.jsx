import {
    HomeIcon,
    MagnifyingGlassIcon,
    ViewColumnsIcon,
    PlusCircleIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import MeniItem from "./MeniItem";
import {useState} from "react";

function Menu({showPopup}) {

    const [activeItem, setActiveItem] = useState('Главная');

    const activeMenuItem = "flex items-center text-white bg-[#282828] mx-2 px-4 py-2 rounded";
    const menuItem = "flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300";
    const menu = [
        {
            href: "/",
            icon: <HomeIcon className="h-7 w-7"/>,
            text: "Главная",
            setActive: () => {
                setActiveItem('Главная');
            }
        },
        {
            href: "/search",
            icon: <MagnifyingGlassIcon className="h-7 w-7"/>,
            text: "Поиск",
            setActive: () => {
                setActiveItem('Поиск');
            }
        },
        {
            href: "/library",
            className: 'mb-6',
            icon: <ViewColumnsIcon className="h-7 w-7"/>,
            text: "Медиатека",
            setActive: () => {
                setActiveItem('Медиатека');
            },
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
            icon: <PlusCircleIcon className="h-7 w-7"/>,
            text: "Создать плейлист",
            setActive: () => {
                setActiveItem('Создать плейлист');
            },
            action: (target) => {
                showPopup(
                    'Создавайте плейлисты',
                    'Войдите, чтобы создать плейлист',
                    target,
                );
            },
        },
        {
            href: "/library",
            icon: <HeartIcon className="h-7 w-7"/>,
            text: "Любимая музыка",
            setActive: () => {
                setActiveItem('Любимая музыка');
            },
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
            {menu.map(({href, className, icon, text, action, setActive}) => (
                <MeniItem href={href}
                          className={`${activeItem === text ? activeMenuItem : menuItem} ${className}`}
                          icon={icon}
                          key={text}
                          setActive={setActive}
                          onClick={action}>
                    {text}
                </MeniItem>
            ))}
        </nav>
    );
}

export default Menu;
