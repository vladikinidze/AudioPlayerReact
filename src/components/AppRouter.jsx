import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Playlist from "../pages/Playlist";

function AppRouter({showPopup, showNotify, modal, averageBackgroundColor, toggleScrolling}) {
    return (
        <Routes>
            <Route path='/'
                   element={<Home showPopup={showPopup}
                                  showNotify={showNotify}
                                  averageBackgroundColor={averageBackgroundColor}
                                  modal={modal}
                                  toggleScrolling={toggleScrolling}/>}/>

            <Route path='/search'
                   element={<Search showPopup={showPopup}
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
    );
}

export default AppRouter;