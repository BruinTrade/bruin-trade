import http from "../axios-http"

export default class ItemServices {
    static get_all() {
        return http.get("/items")
    }

    static getByQuery(by, value) {
        return http.get(`/items?${by}=${value}`)
    }

    static delete(username, item_id) {
        return http.post(`/${username}/${item_id}/delete`)
    }

    static edit(new_title, new_price, new_description){
        const date = {title: new_title, price: new_price, description: new_description}
        return http.post(`/${username}/${item_id}/edit`, data)
    }

    static create(new_title, new_price, new_description) {
        const date = {title: new_title, price: new_price, description: new_description}
        return http.post(`/${username}/createItem`, data)
    }
}