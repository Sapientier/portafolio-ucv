const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriberSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    typeSub: {
        type: String,
        required: true
    },
    dateSub: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);