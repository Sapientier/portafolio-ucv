const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequestSchema = new Schema({
    emailReq: {
        type: String,
        required: true
    },
    dateReq: {
        type: Date,
        required: true
    },
    serviceReq: {
        type: String,
        required: true
    },
    noteReq: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('Request', RequestSchema);