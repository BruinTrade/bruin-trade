import express from "express";
import BackEndRouter from "./router.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
// import session from "express-session"
// import MongoStore from "connect-mongo";
// import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
dotenv.config()


const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('access_control', 'authorization')
    next()
})

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);




// app.use(
//     session({
//         store: MongoStore.create({client: (new MongoClient(process.env.CONNECTSTRING)).connect()}),
//         key: "username",
//         secret: "secretstuff",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             maxAge: 1000*60*60*24, httpOnly:true
//         },
//     })
// );

app.use("/api/BruinTrade", BackEndRouter);

export default app;
