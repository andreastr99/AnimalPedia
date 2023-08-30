const mongoose = require('mongoose')
const Schema = mongoose.Schema

const animalScema = new Schema({
    name: {
        type: String,
        required: true
    },
    classs: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    youtbeLink: String,
    favourite: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    }

})

const AnimalModel = mongoose.model('AnimalModel', animalScema)

module.exports = AnimalModel;