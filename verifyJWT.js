const jwt = require('jsonwebtoken');

function verifyJWT(req,res,next){
    const token=req.header('auth-token');
    if(!token) return res.status(401).send('JWT not found');

    try {
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next();//a function to take you to the next middle ware
    } catch (error) {
        res.status(400).send('Invalid Token');
    }

}

module.exports=verifyJWT;