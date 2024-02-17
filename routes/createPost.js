const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const authenticateToken = require("../middlewares/authToken");


app.use(express.json());


router.post("/" , authenticateToken , (req, res) => {

    // Posting the post on instagram routes
    const test = 1;


});