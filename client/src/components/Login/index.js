import React, { Component } from 'react';

class Login extends Component {

    state = {
        redirectToReferrer: false
    }

    login = () => {

    }

    render() {
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            // Redirect to the main app once we are logged in.
            return <Redirect to='/' />
        }

        return <h1>Login</h1>
    }
}

export default Login
