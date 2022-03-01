import http from "../axios-http"
import imageUpload from "./firebase/imageUpload"


export default class ItemServices {
    static get_all() {
        return http.get("/items")
    }

    static getByQuery(by, value) {
        //console.log("in getByQuery")
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

    static async create(username, token, new_title, new_price, new_description, image_array, condition, location, tags) {
        const config = {
            headers: {
                access_control: token,
            }
        }

        // let url_array = [];

        // image_array.forEach(async (image) => {
        //     try {
        //         let url = await imageUpload(image)
        //         url_array.push(url)
        //     }
        //     catch(error) {
        //         console.log("failed to upload image")
        //         console.log(error)
        //     }
        // })


        // const url_array = await image_array.map(async (image) => {
        //     try{
        //         let url = await imageUpload(image)
        //         return url
        //     } catch(error) {
        //         console.log("failed to upload image")
        //         console.log(error)
        //         return null
        //     }
        // })

        const img_arr_size = image_array.length;

        let url_array = []

        if(img_arr_size >= 1) {
            let url_1 = await imageUpload(image_array[0])
            url_array.push(url_1)
        }

        if(img_arr_size >= 2) {
            let url_2 = await imageUpload(image_array[1])
            url_array.push(url_2)
        }

        if(img_arr_size >= 3) {
            let url_3 = await imageUpload(image_array[2])
            url_array.push(url_3)
        }

        if(img_arr_size >= 4) {
            let url_4 = await imageUpload(image_array[3])
            url_array.push(url_4)
        }

        if(img_arr_size >= 5) {
            let url_5 = await imageUpload(image_array[4])
            url_array.push(url_5)
        }

        if(img_arr_size >= 6) {
            let url_6 = await imageUpload(image_array[5])
            url_array.push(url_6)
        }
        
        //console.log(url_array)

        const data = { title: new_title, price: new_price, description: new_description, images: [...url_array], condition: condition, location: location, tags: tags}

        return http.post(`/${username}/createItem`, data, config)
    }

    static getItemDetailsById(item_id, token) {
        const config = {
            headers: {
                access_control: token,
            }
        }
        return http.get(`/placeholder/${item_id}/details`, config)
    }

}


