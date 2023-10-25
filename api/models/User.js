const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    },
    // age: {type: Number, min: 18, max: 65},
    email: {type: String, unique:true, lowercase: true},
    password: String
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;