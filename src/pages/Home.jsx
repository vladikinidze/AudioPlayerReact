import * as React from 'react';
import image from "../components/Main/image.png"
import donut from "../components/Main/donut.png"
import galaxy from "../components/Main/galaxy.jpg"
import pika from "../components/Main/pika.jpg"
import poni from "../components/Main/poni.jpg"
import piro from "../components/Main/piro.jpg"
import Section from "../components/Section";

const recommendations = {
    title: "Рекомендации",
    description: "",
    playlists: [
        {
            id: 1,
            className: "",
            title: "Playlist title 1",
            description: "description",
            imageUrl: image
        },
        {
            id: 2,
            className: "hidden sm:block",
            title: "Playlist title 2",
            description: "description",
            imageUrl: donut
        },
        {
            id: 3,
            className: "hidden lg:block",
            title: "Playlist title 3",
            description: "description",
            imageUrl: galaxy
        },
        {
            id: 4,
            className: "hidden xl:block",
            title: "Playlist title 4",
            description: "description",
            imageUrl: pika
        },
        {
            id: 5,
            className: "hidden 2xl:block",
            title: "Playlist title 5",
            description: "description",
            imageUrl: poni
        },
        {
            id: 6,
            className: "hidden 3xl:block",
            title: "Playlist title 6",
            description: "description",
            imageUrl: piro
        },
        {
            id: 7,
            className: "hidden 4xl:block",
            title: "Playlist title 7",
            description: "description",
            imageUrl: pika
        },
        {
            id: 8,
            className: "hidden 5xl:block",
            title: "Playlist title 8",
            description: "description",
            imageUrl: piro
        },
        {
            id: 9,
            className: "hidden 6xl:block",
            title: "Playlist title 9",
            description: "description",
            imageUrl: galaxy
        },
    ]
};
function Home({showPopup, showNotify, modal, setColor, toggleScrolling}) {


    return (
        <>
            <Section title={recommendations.title}
                     description={recommendations.description}
                     playlists={recommendations.playlists}
                     toggleScrolling={toggleScrolling}
                     showNotify={showNotify}
                     showPopup={showPopup}
                     openModal={modal.open}
                     setColor={setColor}/>
            <Section title={recommendations.title}
                     description={recommendations.description}
                     playlists={recommendations.playlists}
                     toggleScrolling={toggleScrolling}
                     showNotify={showNotify}
                     showPopup={showPopup}
                     openModal={modal.open}
                     setColor={setColor}/>
            <Section title={recommendations.title}
                     description={recommendations.description}
                     playlists={recommendations.playlists}
                     toggleScrolling={toggleScrolling}
                     showNotify={showNotify}
                     showPopup={showPopup}
                     openModal={modal.open}
                     setColor={setColor}/>
        </>
    );
}

export default Home;
