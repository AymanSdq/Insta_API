const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
// Calling the routes
const regsiterRouter = require("./routes/registerRoutes");
const RegisterModel = require('./models/Register');
const loginRouter = require('./routes/loginRoutes');
const editProfileRouter = require('./routes/editProfile')

// Calling JSON
app.use(express.json());


// Connection to database // Connection before listening to the port
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on("connected", () => { console.log("Database On") });
mongoose.connection.on("error", () => { console.log("Database Error") });


// All the routes
app.get('/', (req, res) =>{
    res.send("This is the home page!")
})

app.use('/register', regsiterRouter);
app.use('/login', loginRouter);
app.use('/editprofile', editProfileRouter);


// Listening to the server
app.listen(
    process.env.PORT,
    console.clear(),
    console.log("Running the server on : http://localhost:3000/")
);