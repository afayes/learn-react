import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ComputerApp from "./containers/computerApp";
import rootReducer from "./reducers/index";
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {fetchComputers} from "./actions";
import {BrowserRouter} from "react-router-dom";

const renderApp = () => {
    const loggerMiddleware = createLogger();
    const store = createStore(rootReducer,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    );

    store
        .dispatch(fetchComputers());

    render(
        <Provider store={store}>
            <BrowserRouter>
                <ComputerApp/>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
};

export default renderApp;

