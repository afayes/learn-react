import {RECEIVE_COMPUTERS} from "../actions";

const initialState = [];

export const computers = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_COMPUTERS:
            return action.computers;
            break;

        default:
            return state;
    }
};

export default computers;
