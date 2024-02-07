const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Register = require("../models/Register");
const router = express.Router();

// Calling  the JSON
app.use(express.json());


// Post routes to create an account
router.post('/', async (req, res) =>{

    try{
        const registerData = await new Register({
            username : req.body.username,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
            confirm_Password: req.body.confirm_Password,
            phone : req.body.phone
        });

        registerData.save()
            .then((result) => {
                res.status(202).send(result)
            })
            .catch((err) => {
                res.status(502).json({message : err.message})
            })

    }catch(err){
        res.status(502).send(err)
    }

});

module.exports = router