// models/Project.js
const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title: String,

    description: String,
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema)

module.exports = Project