const userSchema = require('../Model/userModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const key="Hello"


const UserRegister = async(req,res)=>{
    try{
        const {name,email,phone,password,address}=req.body
        // const image = req.files['image'][0].filename;
        // const logo = req.files['logo'][0].filename;
// console.log(phone)
        const salt= await bcrypt.genSalt(10)
        const secpass= await bcrypt.hash(password,salt)
        console.log(salt)
        const Register=await new userSchema({name,email,ph_no:phone,password:secpass,address})
        const Registered=Register.save()
        res.json(Registered)
    }
    catch(err){
        console.log(err)
    }
}

const UserLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userSchema.findOne({email})
        console.log(email)
         if(!user){
            return res.json({success:false,message:'Incorrect email or password'})
         }
         const ismatch=await bcrypt.compare(password,user.password)
         if(!ismatch){
            return res.json('Incorrect Password')
         }
         const data=user.id
         const token=await jwt.sign(data,key)
         const success=true;
         res.json({token,success})
    }
    catch(err){
        console.log(err)
    }
}


const GetOneUser = async (req, res) => {
    try {
        const ViewSingle= await userSchema.findById(req.user);

        res.send(ViewSingle);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}


const GetUser = async (req, res) => {
    try {
        const ViewUser= await userSchema.find();

        res.send(ViewUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}


const DeleteUser =  async (req, res)=> {
    try{
        let UserInfo = await userSchema.findById(req.params.id);
        if (!UserInfo) {
            return res.status(404).send("Not Found");
        }
        UserInfo = await userSchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "User deleted successfully", User : User });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}


module.exports={UserRegister,UserLogin,GetOneUser,GetUser,DeleteUser}