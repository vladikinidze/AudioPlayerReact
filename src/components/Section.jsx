import Playlist from "./Playlist/Playlist";
import {Link} from "react-router-dom";


const styles = [
    "",
    "hidden sm:block",
    "hidden lg:block",
    "hidden xl:block",
    "hidden 2xl:block",
    "hidden 3xl:block",
    "hidden 4xl:block",
    "hidden 5xl:block",
    "hidden 6xl:block"
];

function Section({
                     title,
                     description,
                     playlists,
                     showNotify,
                     showPopup,
                     openModal,
                     averageBackgroundColor,
                     toggleScrolling
                 }) {

    return (
        <div>
            <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
                <div>
                    <h2 className="text-2xl font-semibold hover:underline">
                        <Link to="/playlists/all">{title}</Link>
                    </h2>
                    <p className="text-sm text-[#b3b3b3]">{description}</p>
                </div>
                <Link to="/playlists/all"
                   className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6">
                    Подробнее
                </Link>
            </div>
            <div
                className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-6">
                {playlists?.map((playlist, index) => (
                    <Playlist key={playlist.id}
                              {...playlist}
                              className={styles[index % 10]}
                              toggleScrolling={toggleScrolling}
                              showNotify={showNotify}
                              showPopup={showPopup}
                              openModal={openModal}
                              averageBackgroundColor={averageBackgroundColor}
                    />
                ))}
            </div>
        </div>
    );
}

export default Section;