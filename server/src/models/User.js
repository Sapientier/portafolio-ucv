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
    // solo hashea la clave si ha sido modificada (o si es nueva)
    if (!user.isModified('password')) return next();

    // genera un salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hashea la clave usando el nuevo salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // sobrescribe la clave con el hash
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