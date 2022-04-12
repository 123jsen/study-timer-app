const express = require("express");
const { Node, Timer } = require("./model.js");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get("/list-all", (req, res) => {
    Timer.find((err, result) => {
        if (err) {
            console.log("Error");
            res.send("Failed");
        } else {
            // result is already JSON (hopefully)
            res.send(result);
        }
    });
})

router.post("/add", (req, res) => {
    let name = req.body.name;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;

    res.send("Timer Created");
})

module.exports = router;