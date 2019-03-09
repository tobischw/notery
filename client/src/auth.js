import Cookies from "js-cookie"
import {socket} from "./api/socket";

export const auth = {
    isAuthenticated: false,
    //TODO: move login function into here as well!
    validate(token) {
        this.isAuthenticated = true;
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
        this.isAuthenticated = false;
        return authenticated;
    }
}
