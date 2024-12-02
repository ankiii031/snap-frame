const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
    },
    ph_no:{
        type:Number,
    },
    address:{
        type:String,
    },
    status:{
        type:String,
    },

   

},{timestamps:true})

module.exports=mongoose.model("user",UserSchema)