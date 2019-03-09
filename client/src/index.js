import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom'

import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
import DefaultTheme from './theme';

// Routing for React Router
import App from './components/App';
import Login from './components/Login';

// Initialize icons for Office UI Fabric.
initializeIcons();
loadTheme(DefaultTheme);

// Load theme.

// Setup routing for pages. This will include login, register, the main app, and its groups.
const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
