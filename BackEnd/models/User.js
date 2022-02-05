import bcrypt from "bcryptjs"

let userCollection

class User {
    constructor(input_data) {
        this.data = input_data
    }
    async register() {
        return new Promise(async (resolve, reject) => {
            //data should be validated at front end (?)
            try {
                let salt = bcrypt.genSaltSync(10)
                this.data.password = bcrypt.hashSync(this.data.password, salt)
                await userCollection.insertOne(this.data)
                resolve()
            }
            catch(error)
            {
                console.log(error)
            }
        })
    }
    static async getUserCollection(client) {
        if (userCollection) {
            return
        }
        try {
            userCollection = await client.db("BruinTrade").collection("users")
        } catch (error) {
            console.log(error)
        }
    }
}



export default User
