const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answer = new Schema({
    key: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
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

module.exports = mongoose.model('Answer', answer)