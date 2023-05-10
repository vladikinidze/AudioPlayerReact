import {
    SET_EMAIL,
    SET_GUID,
    SET_USERNAME
} from "../../actions/userActions";


const initialState = {
    guid: "",
    email: "",
    username: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GUID:
            return {...state, guid: action.payload}
        case SET_EMAIL:
            return {...state, email: action.payload}
        case SET_USERNAME:
            return {...state, username: action.payload}
        default:
            return state;
    }
}