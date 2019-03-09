import React from 'react';
import ReactDOM from 'react-dom';
import {initializeIcons} from '@uifabric/icons';

import * as serviceWorker from './serviceWorker';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom'

import 'office-ui-fabric-react/dist/css/fabric.min.css';

import {loadTheme} from 'office-ui-fabric-react/lib/Styling';
import DefaultTheme from './theme';

// Routing for React Router
import App from './components/App';
import Login from './components/Login';

// Initialize icons for Office UI Fabric.
initializeIcons();

// Load theme.
loadTheme(DefaultTheme);

// Setup routing for pages. This will include login, register, the main app, and its groups.
const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
