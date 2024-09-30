const mongoose = require("mongoose");

const schema = mongoose.Schema({
    Name:{type:String, required:true},
    MobileNo:{type:String, required:true},
    Message:{type:String,required:true}
});

const messageModel = mongoose.model("MessageModel",schema);
module.exports = messageModel;