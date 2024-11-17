import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    qualification : {
        type : String,
        required : true
    },
    interest : [ {
        type : String,
        required : true
    }],
    about : {
        type : String,
    }

},{timestamp: true})

export const Form = mongoose.model("Form", formSchema)