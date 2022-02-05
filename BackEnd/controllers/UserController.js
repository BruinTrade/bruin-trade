import User from "../models/User.js"


export default class UserController {
    static async register(req, res, next) {
        try{
            let temp_user = new User(req.body)
            temp_user.register().then(()=>{
            req.sesson = {username: temp_user.data.username}
            })
            res.json({ status: "success" })
        }
        catch(error)
        {
            console.log(error)
        }
    }

    static async login(req, res, next) {

    }

    static async logout(req, res, next) {

    }

    static async findUserById(req, res, next) {

    }

    static async getPostedItems(req, res, next) {

    }

    static async getFavorites(req, res, next) {

    }
}