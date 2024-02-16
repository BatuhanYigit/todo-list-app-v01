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
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
    { collection: "tasks", timestamps: true })

const task = mongoose.model("tasks", taskShema)

module.exports = task