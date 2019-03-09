import Cookies from "js-cookie"

export const auth = {
    isAuthenticated: false,
    validate() {
        this.isAuthenticated = true;
    },
    validateToken(token) {
        if (token === null) {
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
