import {COMPUTERS_FETCH_SUCCESS} from "../actions";

const initialState = [];

export const computers = (state = initialState, action) => {
    switch (action.type) {
        case COMPUTERS_FETCH_SUCCESS:
            return action.payload.computers;
            break;

        default:
            return state;
    }
};

export default computers;
