import Playlist from "./Playlist/Playlist";
import {Link} from "react-router-dom";
import {styles} from "../utils";

function Section({
                     title,
                     description,
                     playlists,
                     isSearch,
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
                    {title &&
                        <h2 className="text-2xl font-semibold ">
                            {/*hover:underline*/}
                            {/*<Link to="/playlists/all">{title}</Link>*/}
                            {title}
                        </h2>
                    }
                    {description &&
                        <p className="text-sm text-[#b3b3b3]">{description}</p>
                    }
                </div>
                {!isSearch &&
                    <Link to="/playlists/all"
                          className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6">
                        Подробнее
                    </Link>
                }
            </div>
            <div
                className="grid sm:grid-cols-playlists-mobile md:grid-cols-playlists-tablet lg:grid-cols-playlists-desktop gap-6">
                {playlists?.map((playlist, index) => (
                    <Playlist key={playlist.id}
                              {...playlist}
                              user={
                                  {
                                      username: playlist.user,
                                      userId: playlist.userId
                                  }
                              }
                              className={!isSearch ? styles[index % 10] : ""}
                              toggleScrolling={toggleScrolling}
                              trackList={playlist.tracks}
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