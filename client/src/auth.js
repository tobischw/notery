import Cookies from "js-cookie"
import {socket} from "./api/socket";

export const auth = {
    isAuthenticated: false,
    //TODO: move login function into here as well!
    validate(token) {
        console.log('Run Validate!')
        this.isAuthenticated = true;
        console.log('TokenValid:', token)

    },
    logout() {
        Cookies.remove('jwt');
        this.isAuthenticated = false;
    },
    async validateToken(token) {
        var authenticated = false;
        if (token === undefined) {
            return false;
        }
        await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token})
        }).then((res) => res.json())
            .then((res) => {
                this.isAuthenticated = true;
                authenticated = true;
            }).catch((e) => {
                console.log(e);
            }
        );
        console.log(authenticated)
        this.isAuthenticated = false;
        return authenticated;
    }
}
