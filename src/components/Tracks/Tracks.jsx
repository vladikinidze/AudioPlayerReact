import image from "../Main/image.png";
import donut from "../Main/donut.png";
import galaxy from "../Main/galaxy.jpg";
import pika from "../Main/pika.jpg";
import poni from "../Main/poni.jpg";
import piro from "../Main/piro.jpg";
import Track from "./Track";
import {BsClock} from "react-icons/bs";

const playlist = [
    {
        id: 1,
        title: "Track title 1",
        author: "pirokinesis",
        imageUrl: image,
        duration: "3:33",
    },
    {
        id: 2,
        title: "Track title 2",
        author: "pirokinesis",
        imageUrl: donut,
        duration: "3:33",
    },
    {
        id: 3,
        title: "Track title 3",
        author: "pirokinesis",
        imageUrl: galaxy,
        duration: "3:33",
    },
    {
        id: 4,
        title: "Track title 4",
        author: "pirokinesis",
        imageUrl: piro,
        duration: "3:33",
    },
    {
        id: 5,
        title: "Track title 5",
        author: "pirokinesis",
        imageUrl: poni,
        duration: "3:33",
    },
    {
        id: 6,
        title: "Track title 6",
        author: "pirokinesis",
        duration: "3:33",
    },
    {
        id: 7,
        title: "Track title 7",
        author: "pirokinesis",
        duration: "3:33",
    },
    {
        id: 8,
        title: "Track title 8",
        author: "pirokinesis",
        duration: "3:33",
    },
    {
        id: 9,
        title: "Track title 9",
        author: "pirokinesis",
        duration: "3:33",
    },
    {
        id: 10,
        title: "Track title 11",
        author: "pirokinesis",
        duration: "3:33",
    },
    {
        id: 11,
        title: "Track title 11",
        author: "pirokinesis",
        duration: "3:33",
    },
]

function Tracks() {
    return (
        <div>
            <div className="flex flex-row items-center justify-between border-b-2 py-2">
                <p className="mx-6 font-bold w-4 tracking-wide">#</p>
                <p className="mx-6 uppercase grow tracking-wide">Title</p>
                <BsClock className="w-5 h-5 mx-8"/>
            </div>
            {playlist.map(({id, title, author, imageUrl, duration}, index) => (
                    <Track key={id}
                           index={index + 1}
                           id={id}
                           title={title}
                           author={author}
                           duration={duration}
                           imageUrl={imageUrl}/>
                )
            )}
        </div>
    );
}

export default Tracks;