const mongoose = require('mongoose');
const { Schema } = mongoose;
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

const UserSchema = new Schema({
    email: { 
        type: String,
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
        required: true 
    }
});

UserSchema.pre('save', async function(next) {

    var user = this;
    const SALT_WORK_FACTOR = 8;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.pre('updateOne', async function() {
    //const docToUpdate = await this.model.findOne(this.getQuery());
    // await hashPassword(docToUpdate);
});

UserSchema.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);