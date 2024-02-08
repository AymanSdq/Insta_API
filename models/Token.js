const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokenSchema = new Schema({

    userId : {
        type : Schema.Types.ObjectId,
        required : true,
    },

    token : {
        type : String,
        required : true
    },

    expiresIn : {
        type : Date,
        required : true
    },


});


module.exports = mongoose.model('Token' , TokenSchema);