import MenuItem from "./MenuItem";
import {useState} from "react";
import {useSelector} from "react-redux";
import {
    BiHomeAlt2,
    BiSearchAlt2,
    BiCarousel,
    BiPlusCircle,
    BiHeart
} from "react-icons/bi";
import AddUpdatePlaylist from "../../AddUpdatePlaylist";
import {useNavigate} from "react-router-dom";


function Menu({showPopup, sidebarToggle, modal}) {
    const [activeItem, setActiveItem] = useState('Главная');
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const activeMenuItem = "text-white bg-[#282828]";
    const menuItem = "hover:text-white hover:bg-[#282828] duration-300 ";
    const menu = [
        {
            href: "/",
            icon: <BiHomeAlt2 className="h-7 w-7"/>,
            text: "Главная",
            setActive: () => {
                setActiveItem('Главная');
                sidebarToggle.close();
            },
        },
        {
            href: "/search",
            icon: <BiSearchAlt2 className="h-7 w-7"/>,
            text: "Поиск",
            setActive: () => {
                setActiveItem('Поиск');
                sidebarToggle.close();
            },
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
                if (!user.guid) {
                    showPopup(
                        'Сохраняйте в медиатеку',
                        'Войдите, чтобы увидеть сохраненные песни и альбомы',
                        target
                    );
                } else {
                    sidebarToggle.close();
                    navigate("/library");
                }
            },
        },
        {
            href: "/createPlaylist",
            icon: <BiPlusCircle className="h-7 w-7"/>,
            text: "Создать плейлист",
            setActive: () => {
                setActiveItem('Создать плейлист');
            },
            action: (target) => {
                if (!user.guid) {
                    showPopup(
                        'Создавайте плейлисты',
                        'Войдите, чтобы создать плейлист',
                        target,
                    );
                } else {
                    sidebarToggle.close();
                    modal.open(<AddUpdatePlaylist isFavorite={false}
                                                  modalClose={modal.close}/>);
                }
            },
        },
        {
            href: "/favorite",
            icon: <BiHeart className="h-7 w-7"/>,
            text: "Любимая музыка",
            setActive: () => {
                setActiveItem('Любимая музыка');
            },
            action: (target) => {
                if (!user.guid) {
                    showPopup(
                        'Слушайте любимую музыку',
                        'Войдите, чтобы слушать любимую музыку',
                        target,
                    );
                } else {
                    navigate('/favorite')
                }
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
