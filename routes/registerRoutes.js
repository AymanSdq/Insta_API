const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Register = require("../models/Register");
const router = express.Router();
const jwt = require("jsonwebtoken")
require('dotenv').config();
const Token = require("../models/Token")

// Calling  the JSON
app.use(express.json());


// Post routes to create an account
router.post('/', async (req, res) =>{

    try{


        const registerData = await new Register({
            username : req.body.username,
            fullName : req.body.fullName,
            email : req.body.email,
            password : req.body.password,
        });

        registerData.save()
            .then((result) => {

                // Creating the token for the user 
                const tokenCreate = jwt.sign({id : result._id}, process.env.SECRET_KEY);
                
                // Saving the token in the dbs
                const newTokenSave = new Token({
                    userId : result._id,
                    token : tokenCreate,
                    expiresIn : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                });

                newTokenSave.save();

                res.status(202).send("Account Created succeffuly");

            })
            .catch((err) => {
                res.status(502).json({message : err.message})
            })

    }catch(err){
        res.status(502).send(err)
    }

});

module.exports = router