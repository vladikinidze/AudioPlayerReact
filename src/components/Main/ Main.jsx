import * as React from 'react';
import {useRef} from "react";
import useAverageBackgroundColor from "../../hooks/useAverageBackgroundColor";
import image from "./image.png"
import donut from "./donut.png"
import galaxy from "./galaxy.jpg"
import pika from "./pika.jpg"
import poni from "./poni.jpg"
import piro from "./piro.jpg"
import Section from "./Section/Section";


const recommendations = {
    title: "Рекомендации",
    description: "",
    playlists: [
        {
            className: "",
            title: "Playlist title 1",
            description: "description",
            imageUrl: image
        },
        {
            className: "hidden sm:block",
            title: "Playlist title 2",
            description: "description",
            imageUrl: donut
        },
        {
            className: "hidden lg:block",
            title: "Playlist title 3",
            description: "description",
            imageUrl: galaxy
        },
        {
            className: "hidden xl:block",
            title: "Playlist title 4",
            description: "description",
            imageUrl: pika
        },
        {
            className: "hidden 2xl:block",
            title: "Playlist title 5",
            description: "description",
            imageUrl: poni
        },
        {
            className: "hidden 3xl:block",
            title: "Playlist title 6",
            description: "description",
            imageUrl: piro
        },
        {
            className: "hidden 4xl:block",
            title: "Playlist title 7",
            description: "description",
            imageUrl: pika
        },
        {
            className: "hidden 5xl:block",
            title: "Playlist title 8",
            description: "description",
            imageUrl: piro
        },
        {
            className: "hidden 6xl:block",
            title: "Playlist title 9",
            description: "description",
            imageUrl: galaxy
        },
    ]
};

function Main({toggleScrolling, showNotify, showPopup, openModal}) {
    const gradientRef = useRef();
    const {color, set: setColor} = useAverageBackgroundColor();
    const gradient = `linear-gradient(to bottom, ${color}, #121212)`;

    return (
        <main className="text-white relative">
            <div ref={gradientRef} style={{background: gradient}} className={`h-full absolute w-full`}></div>
            <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl">
                <Section title={recommendations.title}
                         description={recommendations.description}
                         playlists={recommendations.playlists}
                         toggleScrolling={toggleScrolling}
                         showNotify={showNotify}
                         showPopup={showPopup}
                         openModal={openModal}
                         setColor={setColor}/>
                <Section title={recommendations.title}
                         description={recommendations.description}
                         playlists={recommendations.playlists}
                         toggleScrolling={toggleScrolling}
                         showNotify={showNotify}
                         showPopup={showPopup}
                         openModal={openModal}
                         setColor={setColor}/>
                <Section title={recommendations.title}
                         description={recommendations.description}
                         playlists={recommendations.playlists}
                         toggleScrolling={toggleScrolling}
                         showNotify={showNotify}
                         showPopup={showPopup}
                         openModal={openModal}
                         setColor={setColor}/>
            </div>
        </main>
    );
}

export default Main;