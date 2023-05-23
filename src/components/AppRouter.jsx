import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Playlist from "../pages/Playlist";

function AppRouter({showPopup, showNotify, modal, searchQuery, averageBackgroundColor, toggleScrolling}) {
    return (
        <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl h-auto overflow-hidden">
            <Routes>
                <Route path='/'
                       element={<Home showPopup={showPopup}
                                      showNotify={showNotify}
                                      averageBackgroundColor={averageBackgroundColor}
                                      modal={modal}
                                      toggleScrolling={toggleScrolling}/>}/>

                <Route path='/search'
                       element={<Search showPopup={showPopup}
                                        searchQuery={searchQuery}
                                        showNotify={showNotify}
                                        averageBackgroundColor={averageBackgroundColor}
                                        modal={modal}
                                        toggleScrolling={toggleScrolling}/>}/>

                <Route path='/playlists/:playlistId'
                       element={<Playlist showPopup={showPopup}
                                          showNotify={showNotify}
                                          averageBackgroundColor={averageBackgroundColor}
                                          modal={modal}
                                          toggleScrolling={toggleScrolling}/>}/>

                <Route path='/users/:userId'
                       element={<Playlist showPopup={showPopup}
                                          showNotify={showNotify}
                                          averageBackgroundColor={averageBackgroundColor}
                                          modal={modal}
                                          toggleScrolling={toggleScrolling}/>}/>

                <Route path="/*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    );
}

export default AppRouter;