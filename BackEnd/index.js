import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
//import session from "express-session";
//import MongoStore from "connect-mongo";
import User from "./models/User.js";
import Item from "./models/Item.js"
import Comment from "./models/Comment.js"

dotenv.config();

const client = mongodb.MongoClient;

const port = process.env.BACKENDPORT || 8000;

client.connect(process.env.CONNECTSTRING).then(async (client) => {
  await User.getUserCollection(client);
  await Item.getItemCollection(client);
  await Comment.getCommentCollection(client);
  // let sessionSetup = session({
  //   secret: "KennyOmega",
  //   store: MongoStore.create({ client: client }),
  //   saveUninitialized: false,
  //   resave: false,
  //   cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
  // });

  // app.use(sessionSetup);

  app.listen(port);
});

//test connecttion
/*
client.connect().then(() => {
    //just for testing the connection to database
    let usersCollection = client.db().collection("users")
    const userInfo = { 
        name: "abc",
        password: "abcdefg"
    }
    usersCollection.insertOne(userInfo)
})
*/
