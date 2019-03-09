import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import React, { Component } from 'react';

import './index.css';

class LoginBox extends Component {
    render() {
        return <div className="login-box">
            <Label className="login-label">Login</Label>
            <TextField required={true} placeholder="Username" />
            <TextField type="password" required={true} placeholder="Password" />
            <Link className="forgot-password" href="/">Forgot password?</Link>
            <div className="button-box">
                <DefaultButton text="Create Account"/>
                <PrimaryButton text="Login"/>
            </div>
        </div>
    }
}

export default LoginBox;
