import http from "../axios-http"

export default class UserServices {
    static login(username, password) {
        const data = { username: username, password: password }
        return http.post("/login", data)
    }

    static logout() {
        return http.post("/logout")
    }

    static register(username, password, email, location) {
        const data = { username: username, password: password, email: email, location: location}
        return http.post("/register", data)
    }

    static checkLogin() {
        return http.get("/login")
    }
}