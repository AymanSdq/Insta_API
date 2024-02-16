const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.static('public'));



// Creating a Schema
const Schema = mongoose.Schema;

// Register Schema
const registerSchema = new Schema({
    
    // Username
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        maxlength : 20,
        minlength : 5,
    },

    // full name
    fullName : {
        type : String,
        required: true,
        maxlength: 50,
    },

    // email
    email : {
        type : String,
        required: true,
        maxlength: 50,
        trim : true,
        lowercase : true,
        unique : true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address',
        },
    },

    // Password 
    password : {
        type : String,
        minlength : 8,
        validate: {
            validator: function (value) {
                return /[!@#$-_%^&*(),.?":{}|<>]/.test(value);
            },
            message: 'Password must contain at least one special character',
        },
        required : true,
    },

    // Addding the profileImage
    profileImage: {
        type: String,
        default: "/uploads/profilePic/Default_pfp.svg.png", 
    },


    // Adding the bioProfile section
    bioProfile : {
        type : String,
        maxlength: 150,
    },

    // Date of Register
    dateOfRegister : {
        type : Date,
        default : Date.now
    },



});

// Crypting the [Password] Before saving it 
registerSchema.pre("save", async function(next) {

    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password, salt);
    
    next();

});



const RegisterModel = mongoose.model("Register", registerSchema);

module.exports = RegisterModel;

