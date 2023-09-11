const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashpassword: {
        type: String,
        required: true
    }
})

//add method to user's schema to compare the given and the stored passwords
userSchema.methods.comparePassword = (password, hashpassword) => {
    //compare the password that is given as an argument
    //and the hashpassword. Makes sure that they are decrypting while
    // comparing and if match the user can login
    return bcryptjs.compare(password, hashpassword);
}

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;