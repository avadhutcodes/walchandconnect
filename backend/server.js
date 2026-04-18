const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(cors()); 
app.use(express.json());
const  startserver  = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("data base connected !");
    console.log("DB state: ",mongoose.connection.readyState);
    app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port ");
});
  }
  catch(error){
    console.log("database not connected becoz of: " , error);
  }
};


 startserver();
const routes = require("./routes");
app.use("/" , routes);
