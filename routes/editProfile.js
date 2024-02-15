const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const authenticateToken = require("../middlewares/authToken");
const Register = require("../models/Register");
const { route } = require("./loginRoutes");
const bcrypt = require("bcrypt")
// multer to upload images
const multer = require("multer");
const path = require("path")


app.use(express.static('public'));

app.use(express.json());



// addint the path and the file name that will run every time
const storage = multer.diskStorage({
    // This is the destination where the files must be save in your server
    destination : function(req, file, cb){
        cb(null, 'public/uploads/ProfilePic/')
    },

    // This is the file name that should be save 
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});

// Creating the function that will choose only the image that must be added 
const fileFilter = (req, file, cb ) => {
    // Allowed ext
    const fileTypes = /jpeg|jpg|png/ ;

    //check ext 
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!'); 
    }

    
}

const upload = multer({ storage : storage });

router.patch("/", authenticateToken, upload.single('profileImage') , async (req , res) => {


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

        // Check if the image profile has been updates
        if(req.file){
            findUserAuth.profileImage = req.file.path
        }
        
        const saveUserUpdates = await findUserAuth.save();

        res.json({message : "The user is up to date", newData : saveUserUpdates});

        
    }catch(err){
        res.status(502).json({message : err.message})
    }

});


module.exports = router;