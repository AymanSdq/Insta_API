const jwt = require('jsonwebtoken');
require("dotenv").config();

function authenticateToken(req, res, next){
    // Get the header Auth token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token is invalid
        }

        req.user = user;

        next();
    });

}; 

module.exports = authenticateToken;