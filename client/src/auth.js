import Cookies from "js-cookie"
import {socket, reconnect} from "./api/socket";

export const auth = {
    isAuthenticated: false,
    reconnect(token) {
        reconnect(token);
    },
    logout() {
        Cookies.remove('jwt');
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
              return true;
            }).catch((e) => {
              return false;
            }
        );
    }
}
