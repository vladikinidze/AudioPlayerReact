import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Playlist from "../pages/Playlist";

function AppRouter({showPopup, showNotify, modal, setColor, toggleScrolling}) {
    return (
        <Routes>
            <Route path='/'
                   element={<Home showPopup={showPopup}
                                  showNotify={showNotify}
                                  setColor={setColor}
                                  modal={modal}
                                  toggleScrolling={toggleScrolling}/>
                   }/>
            <Route path='/search'
                   element={<Search showPopup={showPopup}
                                    showNotify={showNotify}
                                    setColor={setColor}
                                    modal={modal}
                                    toggleScrolling={toggleScrolling}/>}/>
            <Route path='/:playlistId'
                   element={<Playlist showPopup={showPopup}
                                    showNotify={showNotify}
                                    setColor={setColor}
                                    modal={modal}
                                    toggleScrolling={toggleScrolling}/>}/>
            {/*<Route path='/posts' element={<Posts />} />*/}
            {/*<Route path="/error" element={<Error />} />*/}
            <Route path="/*" element={<Navigate to="/" replace/>}/>
        </Routes>
    );
}

export default AppRouter;