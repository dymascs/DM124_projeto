const mongoose = require('mongoose')
const Schema = mongoose.Schema



const question = new Schema({
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    options: {
        type: String,
        required: false
    },
    creationDate: {
        type: String,
        required: false
    },
    modifiedDate: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Question', question)