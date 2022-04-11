const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NodeSchema = Schema({
    name: { type: String, required: true, unique: true },
    time: { type: Number },
    children: [{ type: Schema.Types.ObjectId, ref: "Node" }],
});

let Node = mongoose.model("Node", NodeSchema);

const TimerSchema = Schema({
    node: { type: Schema.Types.ObjectId, ref: "Node", require: true },
    startTime: { type: Date, require: true },
    endTime: { type: Date },
});

let Timer = mongoose.model("Timer", TimerSchema);

module.exports = { Node, Timer };
