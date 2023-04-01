import {useLayoutEffect, useRef, useState} from "react";
import useContextMenu from "../../../hooks/useContextMenu";
import ContextMenu from "./ContextMenu/ContextMenu";
import Image from "./InnerItems/Image";
import PlayButton from "./InnerItems/PlayButton";
import Title from "./InnerItems/Title";
import Description from "./InnerItems/Description";


function Playlist({
                      className,
                      imageUrl,
                      title,
                      description,
                      showNotify,
                      showPopup,
                      openModal,
                      setColor,
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
                // subMenuItems: [
                //     {
                //         text: 'Скопировать ссылку на плейлист',
                //         action: () => {
                //             navigator.clipboard.writeText(title).then(() => {
                //                 menu.close();
                //                 showNotify('Ссылка скопирована');
                //             })
                //         },
                //     },
                // ],
            },
        ];
    }

    const menuItems = generateMenuItems();
    const menu = useContextMenu(menuItems);

    const bgClass = menu.isOpen
        ? "bg-[#272727]"
        : "bg-[#181818] hover:bg-[#272727]";

    useLayoutEffect(() => {
        toggleScrolling(!menu.isOpen);
    });

    return (
        <a href="/"
           className={`relative p-5 rounded-md duration-200 group ${bgClass} ${className}`}
           onContextMenu={menu.open}
           onClick={(event) => event.preventDefault()}>
            <div className="relative">
                <Image url={imageUrl}
                       setColor={setColor}/>
                <PlayButton/>
            </div>
            <Title title={title}/>
            <Description description={description}/>
            {menu.isOpen && (
                <ContextMenu ref={menu.ref}
                             menuItems={menu.items}
                             classNames="fixed bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-3xl cursor-default whitespace-nowrap z-10"/>
            )}
        </a>
    )
}

export default Playlist;