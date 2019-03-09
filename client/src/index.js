import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

// Routing for React Router
import App from './components/App';
import Login from './components/Login';

// Initialize icons for Office UI Fabric.
initializeIcons();

// Setup routing for pages. This will include login, register, the main app, and its groups.
const routing = (
    <Router>
        <div>
            <Route path="/" component={App} />
            <Route path="/login" component={Login} />
        </div>
    </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
