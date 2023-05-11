import {combineReducers} from "redux";
import {playerReducer} from "./playerReducer";
import {userReducer} from "./userReducer";
import {trackReducer} from "./trackReducer";

export const rootReducer = combineReducers({
    player: playerReducer,
    user: userReducer,
    track: trackReducer
});