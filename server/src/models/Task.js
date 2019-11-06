const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    email: { type: String },
    password: { type: String }
});

module.exports = mongoose.model('Task', TaskSchema);