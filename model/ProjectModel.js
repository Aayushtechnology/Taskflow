// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    deadline: Date,
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
