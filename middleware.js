const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifytoken = (req,res,next) => {
 const authheader = req.headers["authorization"];
 if(!authheader){
  return res.status(401).send("no token provided");
 }
 const token = authheader.replace("Bearer ", "");

 try{
  const decoded = jwt.verify(token , process.env.secret);
  req.user = decoded;
  next();
 }
 
 catch(err){
  return res.status(403).send("invalid token");
 }
}

module.exports = verifytoken;
