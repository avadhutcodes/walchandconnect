const express = require("express");
const router = express.Router();
const verifytoken = require("./middleware");
const path = require("path");
const{signup , login , createpost, deletepost , viewpost , mypost} = require("./controller");

router.get("/about" , (req,res) => res.send("welcome to walchandconnect"));
router.post("/signup" , signup);
router.post("/login" , login);

router.post("/createpost" , verifytoken , createpost);
router.delete("/deletepost/:id" , verifytoken , deletepost);
router.get("/viewpost" , verifytoken , viewpost);
router.get("/mypost" , verifytoken , mypost);
router.get("/dashboard" , verifytoken , (req,res) =>{
    res.sendFile(path.join(__dirname,"./views/dashboard.html"));
}); 
router.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/Signup.html"));
});

router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/login.html"));
});

router.get("/dashboard",verifytoken,(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/dashborad.html"));
});




module.exports = router;
