const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    option:{
        type:String,
        required:true,
    },
    votes:{
        type:Number,
        default:0
    }
});

const pollSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    question: {
        type:String,
        required:true
    },
    options:[optionSchema],
    voted:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    created:{
        type:Date,
        default: Date.now
    },
    initialTime:{
        type:Date,
        default:Date.now
    },
    finalTime:{
        type:Date,
        default:Date.now
    },
    view:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Poll", pollSchema);