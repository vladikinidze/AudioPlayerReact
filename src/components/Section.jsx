import Playlist from "./Playlist/Playlist";

function Section({
                     title,
                     description,
                     playlists,
                     showNotify,
                     showPopup,
                     openModal,
                     setColor,
                     toggleScrolling
                 }) {
    return (
        <div>
            <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
                <div>
                    <h2 className="text-2xl font-semibold hover:underline capitalize">
                        <a href="#">{title}</a>
                    </h2>
                    <p className="text-sm text-[#b3b3b3]">{description}</p>
                </div>
                <a href=""
                   className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6">
                    Подробнее
                </a>
            </div>
            <div className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-6">
                {playlists.map((playlist) => (
                    <Playlist key={playlist.title}
                              {...playlist}
                              className={playlist.className}
                              toggleScrolling={toggleScrolling}
                              showNotify={showNotify}
                              showPopup={showPopup}
                              openModal={openModal}
                              setColor={setColor}
                    />
                ))}
            </div>
        </div>
    );
}

export default Section;