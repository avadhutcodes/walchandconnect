const express = require("express");
const router = express.Router();
const verifytoken = require("./middleware");
const path = require("path");
const{signup , login , createpost, deletepost , viewpost , mypost, viewSingle,likesystem} = require("./controller");


router.post("/signup" , signup);
router.post("/login" , login);
router.post("/createpost", verifytoken, createpost)
router.get("/mypost",verifytoken,mypost)
router.delete("/deletepost/:id",verifytoken,deletepost)
router.get("/blog/:id",verifytoken,viewSingle)
router.get("/viewblogs",verifytoken,viewpost)

router.get("/api/me",verifytoken,(req,res)=>{
   res.status(200).json({
    success:true,
    user:req.user
   })
})

router.post("/post/:id",verifytoken,likesystem)


module.exports = router;
