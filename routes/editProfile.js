const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const authenticateToken = require("../middlewares/authToken");
const Register = require("../models/Register");
const { route } = require("./loginRoutes");
const bcrypt = require("bcrypt")



app.use(express.json());

router.patch("/", authenticateToken, async (req , res) => {

    try{

        const {username, fullName, email} = req.body;

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

        //Changing the password for the user
        if(req.body.newPassword){
            // Check if the old Password is entered
            if(req.body.oldPassword == null){
                return res.send("You must enter the old password!");
            }else{
                // Compare the password if it's coorect or not correct
                if(await bcrypt.compare(req.body.oldPassword, findUserAuth.password)){
                    // if the code is correct execute this lines
                    findUserAuth.password = req.body.newPassword;
                }else{
                    // This will be shown if the code is not correct
                    return res.send("The old password is Incorrect!");
                }
            }
        }
        
        const saveUserUpdates = await findUserAuth.save();

        res.json({message : "The user is up to date", newData : saveUserUpdates});

        
    }catch(err){
        res.status(502).json({message : err.message})
    }

});


module.exports = router;