const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const authenticateToken = require("../middlewares/authToken");
const Register = require("../models/Register");
const Post = require("../models/Post");


app.use(express.json());


router.post("/" , authenticateToken , async (req, res) => {

    try{

    }catch(err){

    }

});