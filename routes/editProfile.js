const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authenticateToken = require("../middlewares/authToken");
const Register = require("../models/Register");
const { route } = require("./loginRoutes");
const bcrypt = require("bcrypt")


router.get("/", authenticateToken, async (req , res) => {

    
    const {username, fullName, email, password, oldPassword} = req.body;

    try{

        const findUserAuth = await Register.findById(req.user.id);
        
        // Check if there is update
        if(username){
            findUserAuth.username = username;
        }
        if(fullName){
            findUserAuth.fullName = fullName;
        }
        if(email){
            findUserAuth.email = email;
        }

        // Check of the old Password is correct or no
        if(password){
            if(oldPassword == null){
                return res.send("You must enter the old Password");
            }else if(oldPassword){
                // check if the password is correct or no
                if(await bcrypt.compare(oldPassword, findUserAuth.password)){
                    res.send("The old password is correct")
                }else{
                    return res.send("Old Password is not correct!");
                }
            }
        }



        const updateUser = await findUserAuth.save();

        res.json({ message: "User updated successfully", updateUser });

        
    }catch(err){
        res.status(502).json({message : err.message})
    }

});


module.exports = router;