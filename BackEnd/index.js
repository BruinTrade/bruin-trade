import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const client = new mongodb.MongoClient(process.env.CONNECTSTRING)

const port = process.env.BACKENDPORT || 8000

client.connect().then(() => {
    //just for testing the connection to database
    let usersCollection = client.db().collection("users")
    const userInfo = { 
        name: "abc",
        password: "abcdefg"
    }
    usersCollection.insertOne(userInfo)
})

app.listen(port)

export default client
