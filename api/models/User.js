const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

const UserSchema = new mongoose.Schema({
    name: String,
    birthday: Date,
    email: {type: String, unique:true, lowercase: true, required: true},
    phone: {type:String, required:true},
    password: {type:String, required:true}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;