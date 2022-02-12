import express from "express";
import BackEndRouter from "./Router.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import session from "express-session"

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "username",
        secret: "secretstuff",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24, httpOnly:true
        },
    })
);

app.use("/api/BruinTrade", BackEndRouter);

export default app;
