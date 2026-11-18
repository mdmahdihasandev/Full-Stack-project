let mongoose = require('mongoose')
let {Schema} = mongoose

let presenSchema = new Schema ({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
       
    },
    presentatio: {
        type: Boolean,
        enum: [true , false],
        default: false
    },
    homework: {
        type: String,
        required: true,
        trim:true
    }
})

module.exports = mongoose.model('PresentatioPage', presenSchema)