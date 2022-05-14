const express = require("express");
const mongoose = require("mongoose");
const nodesRouter = require("./nodes.js");
const timerRouter = require("./timer.js");
require("dotenv").config();

const app = express();

//setup dbUri in .env
const dbUri = process.env.MONGODB_KEY;
mongoose.connect(dbUri);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function () {
    app.use(express.static("public"));

    app.use("/nodes", nodesRouter);

    app.use("/timer", timerRouter);
});

const server = app.listen(process.env.PORT || 3000);
