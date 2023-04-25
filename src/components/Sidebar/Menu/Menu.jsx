import MenuItem from "./MenuItem";
import {useState} from "react";
import {
    BiHomeAlt2,
    BiSearchAlt2,
    BiCarousel,
    BiPlusCircle,
    BiHeart
} from "react-icons/bi";


function Menu({showPopup}) {

    const [activeItem, setActiveItem] = useState('Главная');

    const activeMenuItem = "text-white bg-[#282828]";
    const menuItem = "hover:text-white hover:bg-[#282828] duration-300 ";
    const menu = [
        {
            href: "/",
            icon: <BiHomeAlt2 className="h-7 w-7"/>,
            text: "Главная",
            setActive: () => {
                setActiveItem('Главная');
            }
        },
        {
            href: "/search",
            icon: <BiSearchAlt2 className="h-7 w-7"/>,
            text: "Поиск",
            setActive: () => {
                setActiveItem('Поиск');
            }
        },
        {
            href: "/library",
            className: 'mb-6',
            icon: <BiCarousel className="h-7 w-7"/>,
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
            icon: <BiPlusCircle className="h-7 w-7"/>,
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
            icon: <BiHeart className="h-7 w-7"/>,
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
                <MenuItem href={href}
                          className={`flex items-center mx-2 px-4 py-2 rounded ${activeItem === text ? activeMenuItem : menuItem} ${className}`}
                          icon={icon}
                          key={text}
                          setActive={setActive}
                          onClick={action}>
                    {text}
                </MenuItem>
            ))}
        </nav>
    );
}

export default Menu;
