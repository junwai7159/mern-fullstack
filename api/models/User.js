const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    username: {type:String, required:true, unique:true},
    birthday: Date,
    email: {type: String, unique:true, lowercase: true, required: true},
    phone: {type:String, required:true},
    password: {type:String, required:true}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;