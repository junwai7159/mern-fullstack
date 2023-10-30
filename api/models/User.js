const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    username: {type:String, required:true, unique:true},
    birthday: {type:Date, required:true},
    email: {type: String, lowercase: true, required: true, unique:true},
    phone: {type:String, required:true},
    password: {type:String, required:true}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
