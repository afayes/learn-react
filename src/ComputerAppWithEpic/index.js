import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import ComputerApp from "./containers/computerApp";
import rootReducer from "./reducers/index";
import {createLogger} from 'redux-logger'
import {fetchComputers} from "./actions";
import { createBrowserHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epics/index';
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";

const renderApp = () => {
    const history = createBrowserHistory();

    const loggerMiddleware = createLogger();
    const epicMiddleware = createEpicMiddleware();

    const store = createStore(
        connectRouter(history)(rootReducer),
        compose(
            applyMiddleware(
                routerMiddleware(history),
                epicMiddleware, // lets us dispatch() functions
                loggerMiddleware // neat middleware that logs actions
            )
        )

    );

    epicMiddleware.run(rootEpic);

    store
        .dispatch(fetchComputers());

    render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ComputerApp/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );

};

export default renderApp;

