import {combineEpics} from 'redux-observable';
import {ofType} from 'redux-observable';
import {
    COMPUTER_DELETE_REQUEST, COMPUTER_DELETE_SUCCESS,
    COMPUTER_SAVE_REQUEST,
    COMPUTER_SAVE_SUCCESS,
    COMPUTERS_FETCH_REQUEST, COMPUTERS_FETCH_SUCCESS, deleteComputerSuccess, fetchComputers,
    fetchComputersSuccess,
    saveComputerSuccess
} from "../actions";
import computerApi from "../services/computerApi";
import {map, mergeMap, mapTo} from 'rxjs/operators';
import {push} from 'connected-react-router'


const fetchComputerEpic = action$ => action$.pipe(
    ofType(COMPUTERS_FETCH_REQUEST),
    mergeMap(action =>
        computerApi.getComputers().pipe(
            map(response => fetchComputersSuccess(response))
        )
    )
);

const fetchComputerSuccessEpic = action$ => action$.pipe(
    ofType(COMPUTERS_FETCH_SUCCESS),
    mapTo(push("/"))
);

const saveComputerEpic = action$ => action$.pipe(
    ofType(COMPUTER_SAVE_REQUEST),
    mergeMap(action =>
        computerApi.saveComputer(action.payload).pipe(
            map(response => saveComputerSuccess(response))
        )
    )
);

const saveComputerSuccessEpic = action$ => action$.pipe(
    ofType(COMPUTER_SAVE_SUCCESS),
    mapTo(fetchComputers())
);

const deleteComputerEpic = action$ => action$.pipe(
    ofType(COMPUTER_DELETE_REQUEST),
    mergeMap(action =>
        computerApi.deleteComputer(action.payload).pipe(
            map(response => deleteComputerSuccess(response))
        )
    )
);

const deleteComputerEpicSuccessEpic = action$ => action$.pipe(
    ofType(COMPUTER_DELETE_SUCCESS),
    mapTo(fetchComputers())
);

export default combineEpics(
    fetchComputerEpic,
    fetchComputerSuccessEpic,
    saveComputerEpic,
    saveComputerSuccessEpic,
    deleteComputerEpic,
    deleteComputerEpicSuccessEpic
);