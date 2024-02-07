const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");


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
    },

    // firstName
    firstName : {
        type : String,
        required: true,
        maxlength: 50,
    },

    // lastName
    lastName : {
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
        required : true,
        minlength : 8,
        validate: {
            validator: function (value) {
              // Use a regular expression to check for at least one special character
                return /[!@#$-_%^&*(),.?":{}|<>]/.test(value);
            },
            message: 'Password must contain at least one special character',
        },
    },

    // Confrim Password
    confirm_Password : {
        type : String,
        minlenght : 8 ,
        required : true,
        validate : {
            validator: function (value) {
                return value === this.password;
            },
            message : "Password Doesn't match!" 
        }
    },

    // Phone number
    phone : {
        type : String,
        validate: {
            validator: function (value) {
                return /^\d{10}$/g.test(value);
            },
            message: 'Invalid phone number format',
        },
    },

    // Date of Register
    dateOfRegister : {
        type : Date,
        default : Date.now
    },



});


// Crypting the [Password] Before saving it 
registerSchema.pre("save", async (next) => {

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

const RegisterModel = mongoose.model("Register", registerSchema);

module.exports = RegisterModel;

