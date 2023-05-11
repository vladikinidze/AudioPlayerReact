import {SET_QUEQE} from "../../actions/trackActions";


const initialState = {
   queue: null,
}

export const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUEQE:
            return {...state, queue: action.payload}
        default:
            return state;
    }
}