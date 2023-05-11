import {
    PAUSE,
    PLAY,
    SET_ACTIVE,
    SET_CURRENT_TIME,
    SET_DURATION,
    SET_VOLUME,
    SET_MODE
} from "../../actions/playerActions";

const initialState = {
    active: null,
    currentTime: 0,
    duration: 0,
    volume: 100,
    pause: true,
    mode: 1
}

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY:
            return {...state, pause: false}
        case PAUSE:
            return {...state, pause: true}
        case SET_VOLUME:
            return {...state, volume: action.payload}
        case SET_ACTIVE:
            return {...state, active: action.payload, currentTime: 0, duration: 0}
        case SET_DURATION:
            return {...state, duration: action.payload}
        case SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case SET_MODE:
            return {...state, mode: action.payload}
        default:
            return state;
    }
}