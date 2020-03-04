const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    imageService: {
        type: String,
        required: true
    },
    school: {
        type: String
    },
    institute: {
        type: String
    },
    userspp: {
        type: String
    },
    description: {
        type: String
    },
    request: {
        type: String
    },
    paramserv: {
        type: String
    },
    direction: {
        type: String
    }
});

module.exports = mongoose.model('Service', ServiceSchema);
