const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../frontend')));
app.use(express.json());
app.use((req,res,next)=>{
  res.set('Cache-Control', 'no-store');
  next();
});
const routes = require("./routes");
app.use("/" , routes);

const  startserver  = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("data base connected !");
    console.log("DB state: ",mongoose.connection.readyState);
    app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
  }
  catch(error){
    console.log("database not connected becoz of: " , error);
  }
};


 startserver();

