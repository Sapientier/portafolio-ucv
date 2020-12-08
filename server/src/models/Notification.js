const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
    emailsToNoti: [{
        type: String,
        required: true
    }],
    typeNoti: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    descriptionNoti: {
        type: String
    },
    dateNoti: {
        type: Date
    },
    owner: {
        type: String
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);