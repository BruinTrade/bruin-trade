import express from "express";
import BackEndRouter from "./API/Router.js";

//import session from "express-session"

const app = express()

app.use(express.json())

app.use("/api/BruinTrade", BackEndRouter)

export default app