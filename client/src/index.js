import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom'

// Theming
import './index.css';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
import {initializeIcons} from '@uifabric/icons';
import {loadTheme} from 'office-ui-fabric-react/lib/Styling';
import DefaultTheme from './theme';

// Routing for React Router
import App from './components/App';
import Login from './components/Login';

// Authentication
import {auth} from './auth';
import Cookies from 'js-cookie';

// Initialize icons for Office UI Fabric.
initializeIcons();

// Load theme.
loadTheme(DefaultTheme);

// Define a private route.
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        if(Cookies.get('jwt') !== undefined){
            if (auth.isAuthenticated || auth.validateToken(Cookies.get('jwt'))) {
                auth.validate(Cookies.get('jwt'));
                return <Component {...props} />
            }
        } else {
            return <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        }
    }}/>
)

// Setup routing for pages. This will include login, register, the main app, and its groups.
const routing = (
    <Router>
        <Switch
        >
            <PrivateRoute exact path="/" component={App}/>
            <PrivateRoute path="/group/:group" component={App}/>
            <Route path="/login" component={Login}/>
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
