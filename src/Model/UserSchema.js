const mongoose = require ( 'mongoose')

const Users = new mongoose.Schema({

    Fullname: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    }

})


module.exports = new mongoose.model("User", Users)