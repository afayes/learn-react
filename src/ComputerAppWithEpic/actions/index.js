export const COMPUTERS_FETCH_REQUEST = "COMPUTERS_FETCH_REQUEST";
export const COMPUTERS_FETCH_SUCCESS = "COMPUTERS_FETCH_SUCCESS";

export const COMPUTER_SAVE_REQUEST = "COMPUTER_SAVE_REQUEST";
export const COMPUTER_SAVE_SUCCESS = "COMPUTER_SAVE_SUCCESS";

export const COMPUTER_DELETE_REQUEST = "COMPUTER_DELETE_REQUEST";
export const COMPUTER_DELETE_SUCCESS = "COMPUTER_DELETE_SUCCESS";

export function fetchComputers() {
    return {type: COMPUTERS_FETCH_REQUEST}
}

export function fetchComputersSuccess(payload) {
    return {type: COMPUTERS_FETCH_SUCCESS, payload}
}

export function saveComputer(computer) {
    return {type: COMPUTER_SAVE_REQUEST, payload: computer}
}

export function saveComputerSuccess(computer) {
    return {type: COMPUTER_SAVE_SUCCESS, payload: computer}
}

export function deleteComputer(computerId) {
    return {type: COMPUTER_DELETE_REQUEST, payload: computerId}
}

export function deleteComputerSuccess(computer) {
    return {type: COMPUTER_DELETE_SUCCESS, payload: computer}
}