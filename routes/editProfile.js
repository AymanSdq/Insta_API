const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authenticateToken = require("../middlewares/authToken");
const Register = require("../models/Register");
const { route } = require("./loginRoutes");


router.get("/", authenticateToken , async (req, res) => {


    const findUserAuth = await Register.findById(req.user.id)
    res.send(findUserAuth);

});

router.patch("/:id", authenticateToken, async (req , res) => {

    const {username, fullName, email, password} = req.body;

    // Save the data in Objects
    const updates = {};
    // Check if there is update
    if(username){
        updates.username = username;
    }
    if(fullName){
        updates.username = username;
    }
    if(email){
        updates.username = username;
    }



});


module.exports = router;