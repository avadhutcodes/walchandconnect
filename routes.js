const express = require("express");
const router = express.Router();
const verifytoken = require("./middleware");
const{signup , login , createpost, deletepost , viewpost} = require("./controller");

router.get("/about" , (req,res) => res.send("welcome to walchandconnect"));
router.post("/signup" , signup);
router.post("/login" , login);

router.post("/createpost" , verifytoken , createpost);
router.delete("/deletepost" , verifytoken , deletepost);
router.get("/viewpost" , verifytoken , viewpost);

module.exports = router;
