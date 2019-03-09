import React, { Component } from 'react';

import logo from '../../resources/logo.png';

import './index.css';
import './LoginBox/';

import LoginBox from "./LoginBox"

class Login extends Component {
    state = {
        redirectToReferrer: false
    }

    login = () => {

    }

    render() {
        const { redirectToReferrer } = this.state

        /*if (redirectToReferrer === true) {
            // Redirect to the main app once we are logged in.
            return <Redirect to='/' />
        }*/

        return <div className="login">
            <img className="logo" src={logo} alt="Logo" />
            <LoginBox />
        </div>
    }
}

export default Login
