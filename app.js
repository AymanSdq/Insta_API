const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

// Calling JSON
app.use(express.json());


// Connection to database
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on("connected", () => { console.log("Database On") });
mongoose.connection.on("error", () => { console.log("Database Error") });

// Listening to the server
app.listen(
    3000,
    console.clear(),
    console.log("Running the server on : http://localhost:3000/")
);