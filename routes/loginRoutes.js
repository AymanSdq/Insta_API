const express =  require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();
const Register = require('../models/Register');
const Token = require('../models/Token');
const bcrypt = require("bcrypt");
require("dotenv").config();


// Using the JSON 
app.use(express.json());

router.post('/', async (req, res) => {

    try{ 

        // Checking if the email or the password are entered
        if(await req.body.useremail == null){
            return res.status(402).send("Please Enter email or username")
        }else if(await req.body.password == null){
            return res.status(402).send("Please Enter Password!")
        }

        const findUser = await Register.findOne({
            $or : [
                {username : req.body.useremail },
                {email : req.body.useremail },
            ]
        });

        if(findUser == null ){
            return res.status(404).send("Account not found!")
        }

        if(await bcrypt.compare(req.body.password, findUser.password)){
            // If the password and the username is correct 
            // Create a toke for the user 
            const tokenCreate = jwt.sign({id : findUser._id}, process.env.SECRET_KEY);

            // Save the token in the database
            const saveToken = new Token({
                userId : findUser._id,
                token : tokenCreate,
                expiresIn : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            })

            saveToken.save();

            res.status(202).json({message : "You are Logged in"});


        }else{
            res.status(502).send("Email or Password are Incorrect");
        }

    }catch(err){
        res.status(502).send({message : err.message});
    }

});


module.exports = router