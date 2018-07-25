const initialState = [{id: 1, enabled: false}, {id: 2, enabled: false}, {id: 3, enabled: false}];

export const items = (state = initialState, action) => {
    switch (action.type) {
        case "toggle":
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.id) {
                    const item = state[i];
                    const stateUpdated = [...state];
                    stateUpdated[i] = {...item, enabled: !item.enabled};
                    return stateUpdated;
                }
            }
            break;

        default:
            return state;
    }
};

export default items;
