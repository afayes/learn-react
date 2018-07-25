import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AppWithRouting from './AppWithRouting';

const renderApp = () => {
    render((
        <BrowserRouter>
            <AppWithRouting />
        </BrowserRouter>
    ), document.getElementById('root'));
};

export default renderApp;

