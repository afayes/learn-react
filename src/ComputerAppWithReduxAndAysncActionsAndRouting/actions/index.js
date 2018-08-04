import computerApi from "../services/computerApi";

export const RECEIVE_COMPUTERS = "RECEIVE_COMPUTERS";

function receiveComputers(json) {
    return {type: RECEIVE_COMPUTERS, computers: json.computers}
}

export function fetchComputers() {
    return dispatch => {
        return computerApi.getComputers()
            .then(computers => dispatch(receiveComputers(computers)))
    };
}

export function saveComputer(computer) {
    return dispatch => {
        return computerApi.saveComputer(computer)
            .then(() => computerApi.getComputers())
            .then(computers => dispatch(receiveComputers(computers)))
    };
}

export function deleteComputer(computerId) {
    return dispatch => {
        return computerApi.deleteComputer(computerId)
            .then(() => computerApi.getComputers())
            .then(computers => dispatch(receiveComputers(computers)))
    };
}