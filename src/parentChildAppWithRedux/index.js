import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import ParentCompWithReduxContainer from "./containers/ParentCompWithReduxContainer";
import rootReducer from "./reducers/index";

const renderApp = () => {
    const store = createStore(rootReducer);

    render(
        <Provider store={store}>
            <ParentCompWithReduxContainer/>
        </Provider>,
        document.getElementById('root')
    );
};

export default renderApp;

