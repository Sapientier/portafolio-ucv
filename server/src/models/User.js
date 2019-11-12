const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String, 
        unique: true 
    }
});

module.exports = mongoose.model('User', UserSchema);