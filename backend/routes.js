const express = require("express");
const router = express.Router();
const verifytoken = require("./middleware");
const{signup , login , createpost, deletepost , viewpost , mypost} = require("./controller");

router.get("/about" , (req,res) => res.send("welcome to walchandconnect"));
router.post("/signup" , signup);
router.post("/login" , login);

router.post("/createpost" , verifytoken , createpost);
router.delete("/deletepost/:id" , verifytoken , deletepost);
router.get("/viewpost" , verifytoken , viewpost);
router.get("/mypost" , verifytoken , mypost);

module.exports = router;
