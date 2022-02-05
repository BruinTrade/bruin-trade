import express from "express";
import BackEndRouter from "./Router.js";

const app = express();

app.use(express.json());

app.use("/api/BruinTrade", BackEndRouter);

export default app;
