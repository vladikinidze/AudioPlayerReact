import {useLayoutEffect, useRef} from "react";
import useContextMenu from "../../hooks/useContextMenu";
import ContextMenu from "../ContextMenu/ContextMenu";
import Image from "../UI/Image";
import PlayButton from "./PlayButton";
import Title from "./Title";
import Description from "./Description";
import {useNavigate} from "react-router-dom";


function Playlist({
                      id,
                      user,
                      className,
                      image,
                      title,
                      description,
                      showNotify,
                      showPopup,
                      openModal,
                      averageBackgroundColor,
                      toggleScrolling
                  }) {
    function generateMenuItems() {
        return [
            {
                text: 'Добавить в медиатеку',
                action: () => {
                    menu.close();
                    showPopup();
                },
            },
            {
                text: 'Показать модальное окно',
                action: () => {
                    menu.close();
                    openModal();
                },
            },
            {
                text: 'Копировать ссылку на плейлист',
                action: () => {
                    navigator.clipboard.writeText(title).then(() => {
                        menu.close();
                        showNotify('Ссылка скопирована');
                    })
                },
            },
        ];
    }
    const imageRef = useRef();
    const menuItems = generateMenuItems();
    const menu = useContextMenu(menuItems);
    const navigate = useNavigate();
    const bgClass = menu.isOpen
        ? "bg-[#272727]"
        : "bg-[#181818] hover:bg-[#272727]";

    useLayoutEffect(() => {
        toggleScrolling(!menu.isOpen);
    });

    function onClicked(event) {
        event.preventDefault();
        event.stopPropagation();
        if (menu.isOpen) {
            return;
        }
        navigate(`/playlists/${id}`);
    }

    function setAverageColorWithRef() {
        averageBackgroundColor.set(imageRef);
    }

    function setAverageColor() {
        averageBackgroundColor.setColor("#121212");
    }

    return (
        <div className={`relative p-5 rounded-md duration-200 group ${bgClass} ${className}`}
             onContextMenu={menu.open}
             onMouseOver={setAverageColorWithRef}
             onMouseLeave={setAverageColor}
             onClick={onClicked}>
            <div className="relative m-auto">
                <Image ref={imageRef}
                       url={`https://localhost:7182/api/files/${image}`}/>
                <PlayButton/>
            </div>
            <Title title={title}/>
            <Description data={user}/>
            {menu.isOpen && (
                <ContextMenu ref={menu.ref}
                             menuItems={menu.items}
                             classNames="fixed bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-3xl cursor-default whitespace-nowrap z-10"/>
            )}
        </div>
    )
}

export default Playlist;