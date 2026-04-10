const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(cors()); 

app.use(express.json());
const  connectDB  = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("data base connected !");
  }
  catch(error){
    console.log("database not connected becoz of: " , error);
  }
};

connectDB();           

app.use((req,res,next) =>{
console.log("user:", req.body.username);
next();
});

const routes = require("./routes");
app.use("/" , routes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port ");
});
