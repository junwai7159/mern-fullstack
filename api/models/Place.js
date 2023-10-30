const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema ({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: {type:String, maxlength: 100},
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String, 
    checkOut: String,
    maxGuests: {type:Number, min: 1, max: 50},
    price: {type:Number, min: 1},
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;