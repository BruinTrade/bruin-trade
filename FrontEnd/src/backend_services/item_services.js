import http from "../axios-http"



export default class ItemServices {
    static get_all() {
        return http.get("/items")
    }

    static getByQuery(by, value) {
        return http.get(`/items?${by}=${value}`)
    }

    static delete(username, item_id, token) {
        const config = {
            headers: {
                access_control: token,
            }
        }
        const data = {}
        return http.post(`/${username}/${item_id}/delete`, data, config)
    }

    static edit(username, token, item_id, new_title, new_price, new_description) {
        const config = {
            headers: {
                access_control: token,
            }
        }
        const data = { title: new_title, price: new_price, description: new_description }
        return http.post(`/${username}/${item_id}/edit`, data, config)
    }

    static create(username, token, new_title, new_price, new_description) {
        const config = {
            headers: {
                access_control: token,
            }
        }
        const data = { title: new_title, price: new_price, description: new_description }
        
        return http.post(`/${username}/createItem`, data, config)
    }

    static getItemDetailsById(item_id) {
        return http.get(`/username/${item_id}/details`)
    }
}