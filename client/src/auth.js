import Cookies from "js-cookie"
import {socket, reconnect} from "./api/socket";

export const auth = {
    isAuthenticated: false,
    //TODO: move login function into here as well!
    validate(token) {
        console.log('Run Validate!')
        this.isAuthenticated = true;
        console.log('TokenValid:', token)
        
        reconnect(token);
    },
    logout() {
        Cookies.remove('jwt');
        this.isAuthenticated = false;
    },
    validateToken(token) {
        if (token === undefined) {
            return false;
        }
        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token})
        }).then((res) => res.json())
            .then((res) => {
                this.isAuthenticated = true;
                return true;
            }).catch((e) => {
                console.log(e);
            }
        );
        this.isAuthenticated = false;
        return false;
    }
}
