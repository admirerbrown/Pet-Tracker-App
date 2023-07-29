const jwt = require("jsonwebtoken");

// authenticating jwt token...
function authenticateToken(req, res, next){
    // getting && extracting authorization token from request header ...
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('token',token);
    if(token == null) return res.sendStatus(401);  //checking there is a token.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , ( err, user) =>{  // verifying the authenticity of the token ..
        if(err) return res.sendStatus(403);  // forbidden status..
        req.user = user;
        console.log(user);
        next();
    })
}

module.exports = {
    authenticateToken
}