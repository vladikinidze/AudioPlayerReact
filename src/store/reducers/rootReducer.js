import {combineReducers} from "redux";
import {playerReducer} from "./playerReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
    player: playerReducer,
    user: userReducer
});