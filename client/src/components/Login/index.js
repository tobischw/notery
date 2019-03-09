import React, { Component } from 'react';

import logo from '../../resources/logo-inverse.png';

import './index.css';
import {DefaultButton, Label, Link, PrimaryButton, TextField} from 'office-ui-fabric-react'

import config from '../../config';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin() {
       // alert(this.ref.username.value);
        console.log(this.state.username + ' ' + this.state.password);
        console.log(JSON.stringify({username: this.state.username, password: this.state.password}));
        var data = {
            username: this.state.username,
            password: this.state.password
        }

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
        .then((res) => {
            // Handle Cookie Monster Here
            // res contains the token as a json object
            //console.log(res);
        });
        
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
        return <div className="login">
            <img className="logo" src={logo} alt="Logo" />
            <div className="login-box">
                <Label className="login-label">Login</Label>
                <TextField onChanged={this.handleUsernameChange} required={true} placeholder="Username" borderless/>
                <TextField onChanged={this.handlePasswordChange} type="password" required={true} placeholder="Password"  borderless />
                <Link className="forgot-password" href="/">Forgot password?</Link>
                <div className="button-box">
                    <DefaultButton text="Create Account"/>
                    <PrimaryButton text="Login" onClick={this.submitLogin} />
                </div>
            </div>
        </div>
    }
}

export default Login
