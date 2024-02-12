const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authenticateToken = require("../middlewares/authToken");
const Register = require("../models/Register");


router.get("/", authenticateToken , (req, res) => {

    res.json({user : req.user});


    
})


module.exports = router;