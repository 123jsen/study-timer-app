const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

//setup dbUri in .env
const dbUri = process.env.MONGODB_KEY;
mongoose.connect(dbUri);

const db = mongoose.connection;

const Schema = mongoose.Schema;

const NodeSchema = Schema({
	name: { type: String, required: true, unique: true },
	time: { type: Number },
	children: [{ type: String }]
})

let Node = mongoose.model("Node", NodeSchema);

/*
const TimerSchema = Schema({
	node: { type: Node, required: true },
	startTime: { type: Date, require: true },
	endTime: { type: Date }
});

let Timer = mongoose.model("Timer", TimerSchema);
*/

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function () {
	app.use(express.static('public'));

	app.post("/nodes/list-all", (req, res) => {
		console.log(req.url + " Received");
		Node.find((err, result) => {
			if (err) {
				console.log("Error");
				res.send("Failed");
			}
			else {
				// result is already JSON (hopefully)
				res.send(result);
			}
		})
	})

	app.post("/nodes/find/:name", (req, res) => {
		Node.findOne({ name: req.params["name"] })
			.exec((err, result) => {
				if (err)
					console.log("Error Finding Node");
				else {
					console.log("results found: " + result);
					res.send(result);
				}
			});
	});

	app.post("/nodes/create/:parent/:name", (req, res) => {
		console.log(req.url + " Received");
		console.log(req.params);
		Node.create({
			name: req.params["name"]
		}, (err, result) => {
			if (err)
				console.log("Error Creating Node");
			else {

				Node.updateOne({ name: req.params["parent"] },
					{ $push: { children: req.params["name"] } },
					(cb) => console.log(cb));

				console.log("Create Success");
				res.send("Create Success");
			}
		})
	})

	app.post("/nodes/reset-all", (req, res) => {
		Node.deleteMany({}, () => {
			console.log("Delete");
		});
		res.send("Deleted All");
	})

	app.get("/", (req, res) => {
		res.sendFile(__dirname + "/index.html");
	});
})

const server = app.listen(3000);
