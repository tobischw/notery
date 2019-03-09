import React, {Component} from 'react';

import {instanceOf} from 'prop-types';

import Cookies from 'js-cookie';

import logo from '../../resources/logo-inverse.png';

import './index.css';
import {
    DefaultButton,
    Label,
    Link,
    PrimaryButton,
    TextField,
    Dialog,
    DialogType,
    DialogFooter
} from 'office-ui-fabric-react'

import {Redirect} from "react-router-dom"

import {auth} from '../../auth';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            hideDialog: true,
            authenticated: false
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.hideErrorDialog = this.hideErrorDialog.bind(this);

        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin() {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        }).then((res) => res.json())
            .then((res) => {
                const {cookies} = this.props;
                const token = res.token;

                Cookies.set('jwt', token);

                auth.validate(token);
                this.setState({authenticated: true});
            }).catch((e) => {
                console.log(e);
                this.setState({
                    hideDialog: false
                })
            }
        );
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

    hideErrorDialog() {
        this.setState({
            hideDialog: true
        })
    }

    render() {
        if (auth.isAuthenticated || this.state.authenticated) {
            return <Redirect to={{
                pathname: '/'
            }}/>
        }
        return <div className="login">
            <img className="logo" src={logo} alt="Logo"/>
            <div className="login-box">
                <Label className="login-label">Login</Label>
                <TextField onChanged={this.handleUsernameChange} required={true} placeholder="Username" borderless/>
                <TextField onChanged={this.handlePasswordChange} type="password" required={true} placeholder="Password"
                           borderless/>
                <Link className="forgot-password" href="/">Forgot password?</Link>
                <div className="button-box">
                    <DefaultButton text="Create Account"/>
                    <PrimaryButton text="Login" onClick={this.submitLogin}/>
                </div>
            </div>
            <Dialog
                hidden={this.state.hideDialog}
                onDismiss={this.hideErrorDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Invalid Login',
                    subText: 'Make sure your username and password is correct.'
                }}
                modalProps={{
                    titleAriaId: this._labelId,
                    subtitleAriaId: this._subTextId,
                    isBlocking: false,
                    containerClassName: 'ms-dialogMainOverride'
                }}
            >
                <DialogFooter>
                    <DefaultButton onClick={this.hideErrorDialog} text="Close"/>
                </DialogFooter>
            </Dialog>
        </div>
    }
}

export default Login
