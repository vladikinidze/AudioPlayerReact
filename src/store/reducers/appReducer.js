import {SET_EXPLICIT} from "../../actions/appActions";


const initialState = {
    explicit: false,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXPLICIT:
            return {...state, explicit: action.payload}
        default:
            return state;
    }
}