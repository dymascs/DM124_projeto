const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
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

module.exports = mongoose.model('User', user)