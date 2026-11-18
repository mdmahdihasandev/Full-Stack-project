let mongoose = require('mongoose')
let {Schema} = mongoose

let useralldata = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type : String,
        trim: true,
        minlength: 5,
        maxlength: 100
    },

    tream: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Page', useralldata)
