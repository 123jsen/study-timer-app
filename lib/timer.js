const express = require("express");
const { Node, Timer } = require("./model.js");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get("/list-all", (req, res) => {
    console.log("GET: list-all");
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
    console.log("POST: add " + JSON.stringify(req.body));
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;

    let nodeID;
    Node.findOne({
        name: req.body.name
    }, (err, result) => {
        if (err) {
            console.log("Cannot find node " + err);
            res.send("Cannot find node " + err);
        } else {
            nodeID = result._id;
            console.log("nodeId: " + nodeID);

            Timer.create({
                node: nodeID,
                startTime: startTime,
                endTime: endTime
            }, (err, result) => {
                if (err) {
                    console.log("Failed to create timer " + err);
                    res.send("Failed to create timer " + err);
                } else {
                    res.send("Timer Created");
                }
            });
        }
    });


});

module.exports = router;