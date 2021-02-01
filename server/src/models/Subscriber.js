const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriberSchema = new Schema({
    emailSub: {
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
    catSub: [{
        type: String,
    }],
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);