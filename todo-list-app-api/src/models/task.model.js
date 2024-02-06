const mongoose = require("mongoose")

const taskShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
    }
},
    { collection: "tasks", timestamps: true })

const task = mongoose.model("tasks", taskShema)

module.exports = task