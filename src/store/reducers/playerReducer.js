import {
    PAUSE,
    PLAY,
    SET_ACTIVE, SET_ARTIST,
    SET_CURRENT_IMAGE,
    SET_CURRENT_TIME,
    SET_DURATION, SET_TITLE,
    SET_VOLUME
} from "../../actions/playerActions";

const initialState = {
    active: null,
    artist: "",
    title: "",
    currentTime: 0,
    duration: 0,
    volume: 100,
    pause: true,
    image: null
}

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY:
            return {...state, pause: false}
        case PAUSE:
            return {...state, pause: true}
        case SET_ARTIST:
            return {...state, artist: action.payload}
        case SET_TITLE:
            return {...state, title: action.payload}
        case SET_VOLUME:
            return {...state, volume: action.payload}
        case SET_ACTIVE:
            return {...state, active: action.payload, currentTime: 0, duration: 0}
        case SET_DURATION:
            return {...state, duration: action.payload}
        case SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case SET_CURRENT_IMAGE:
            return {...state, image: action.payload}
        default:
            return state;
    }
}