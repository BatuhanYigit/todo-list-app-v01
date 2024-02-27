const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Db connect successfuly")
    })
    .catch((err) => {
        console.log("Db connect failed : ", err)
    })