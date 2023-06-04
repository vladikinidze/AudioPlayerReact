import {
    ADD_TO_QUEUE,
    SET_NORMAL,
    SET_QUEUE,
    SET_SHUFFLE
} from "../../actions/trackActions";
import {shuffle} from "../../utils";


const initialState = {
    queue: [],
    shuffle: false,
}


export const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUEUE:
            return {...state, queue: action.payload}
        case SET_SHUFFLE:
            return {...state, shuffle: true, queue: [...shuffle([...state.queue])]}
        case SET_NORMAL:
            return {...state, shuffle: false, queue: [...state.queue]}
        case ADD_TO_QUEUE:
            return {...state, queue: [...state.queue, action.payload]}
        default:
            return state;
    }
}