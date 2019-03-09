export const auth = {
    isAuthenticated: false,
    validate() {
        this.isAuthenticated = true;
    }
}
