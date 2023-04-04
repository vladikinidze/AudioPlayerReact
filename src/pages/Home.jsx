import * as React from 'react';
import {useRef} from "react";
import useAverageBackgroundColor from "../hooks/useAverageBackgroundColor";
import image from "../components/Main/image.png"
import donut from "../components/Main/donut.png"
import galaxy from "../components/Main/galaxy.jpg"
import pika from "../components/Main/pika.jpg"
import poni from "../components/Main/poni.jpg"
import piro from "../components/Main/piro.jpg"
import Section from "../components/Main/Section";


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

//import TrackProgress from "./components/TrackProgress/TrackProgress";

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
