import {combineReducers} from "redux";
import {playerReducer} from "./playerReducer";
import {userReducer} from "./userReducer";
import {trackReducer} from "./trackReducer";
import {appReducer} from "./appReducer";

export const rootReducer = combineReducers({
    player: playerReducer,
    user: userReducer,
    track: trackReducer,
    app: appReducer
});