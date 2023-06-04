import {
    CLEAR_USER,
    SET_EMAIL,
    SET_FAVORITE_PLAYLIST,
    SET_GUID, SET_IMAGE,
    SET_USERNAME
} from "../../actions/userActions";


const initialState = {
    guid: "",
    email: "",
    image: "",
    username: "",
    favoritePlaylistId: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GUID:
            return {...state, guid: action.payload}
        case SET_EMAIL:
            return {...state, email: action.payload}
        case SET_IMAGE:
            return {...state, image: action.payload}
        case SET_USERNAME:
            return {...state, username: action.payload}
        case SET_FAVORITE_PLAYLIST:
            return {...state, favoritePlaylistId: action.payload}
        case CLEAR_USER:
            return initialState;
        default:
            return state;
    }
}