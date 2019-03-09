import React, { Component } from 'react';

import logo from '../../resources/logo.png';

import './index.css';
import {DefaultButton, Label, Link, PrimaryButton, TextField} from 'office-ui-fabric-react'

import config from '../../config';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onLoginClick() {
       // alert(this.ref.username.value);
        console.log(this.state.username + ' ' + this.state.password);

        fetch(config.server_url + '/api/login', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        }).then(response => alert(response.json));
    }

    handleUsernameChange(value) {
        this.setState({
            username: value
        })
    }

    handlePasswordChange(value) {
        this.setState({
            password: value
        })
    }

    render() {
        const { redirectToReferrer } = this.state

        /*if (redirectToReferrer === true) {
            // Redirect to the main app once we are logged in.
            return <Redirect to='/' />
        }*/

        return <div className="login">
            <img className="logo" src={logo} alt="Logo" />
            <div className="login-box">
                <Label className="login-label">Login</Label>
                <TextField onChanged={this.handleUsernameChange} required={true} placeholder="Username" />
                <TextField onChanged={this.handlePasswordChange} type="password" required={true} placeholder="Password" />
                <Link className="forgot-password" href="/">Forgot password?</Link>
                <div className="button-box">
                    <DefaultButton text="Create Account"/>
                    <PrimaryButton text="Login" onClick={this.onLoginClick} />
                </div>
            </div>
        </div>
    }
}

export default Login
