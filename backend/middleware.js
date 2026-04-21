const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifytoken = (req,res,next) => {
 const token = req.cookies.token;
 if(!token){
    return res.status(401).json({message:"no token provided"});

 }
 const realtoken = token.replace("Bearer" , "");

 try{
  const decoded = jwt.verify(realtoken , process.env.secret);
  req.user = decoded;
  next();
 }
 
 catch(err){
  return res.status(403).send("invalid token");
 }
}

module.exports = verifytoken;
