const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Adding the schema to this variable
const Schema = mongoose.Schema;


// Creating the post

const postSchema = new Schema({

    // The post will be related to this user
    userId : {
        type :  Schema.Types.ObjectId,
        ref : "Register",
    },

    postImgVid : [{
        type : String,
        //required : true,

    }],

    postCaption : {
        type : String,
        maxlength : 150
    },

    postCreatedAt : {
        type : Date,
        default : Date.now
    },

    postUpdatedAt : {
        type : Date,
        default : Date.now
    },



    // Must add the like and the comments but do it later because itself needes a Models to create
    

    
});