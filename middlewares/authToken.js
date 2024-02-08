const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    // Get the header Auth token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify();

}; 

module.exports = authenticateToken;