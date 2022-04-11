const express = require("express");
const { Node } = require("./model.js");
const router = express.Router();

router.get("/list-all", (req, res) => {
    Node.find((err, result) => {
        if (err) {
            console.log("Error");
            res.send("Failed");
        } else {
            // result is already JSON (hopefully)
            res.send(result);
        }
    });
});

router.get("/find/:name", (req, res) => {
    Node.findOne({ name: req.params["name"] })
        .exec((err, result) => {
            if (err) console.log("Error Finding Node");
            else {
                console.log("results found: " + result);
                res.send(result);
            }
        });
});

router.get("/create/:parent-:name", (req, res) => {
    console.log("Create with " + req.params.name + " and " + req.params.parent);

    Node.create({ name: req.params["name"] }, (err, created) => {
        if (err) {
            console.log("Error Creating Node");
            res.send("Error Creating Node");
        }
        else {
            console.log("created node " + created._id);
            // Update has at least three parameters (contitions, update, callback)
            Node.updateMany(
                { name: req.params["parent"] },
                { $push: { children: created.id } },
                (err, result) => {
                    if (result.modifiedCount === 1)
                        res.send("Create Success<br>Modify Parent Success");
                    else
                        res.send("Create Success<br>Modify Parent Failed");
                }
            );
        }
    });
});

router.get("/reset-all", (req, res) => {
    Node.deleteMany({}, () => {
        console.log("Delete");
    });
    res.send("Deleted All");
});

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

module.exports = router;
