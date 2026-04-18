const mongoose = require("mongoose");

const postschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    time:{
        type: Date,
        default: Date.now
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports = mongoose.model("Post" , postschema);
