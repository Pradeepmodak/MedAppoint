import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
// API to register user
const registerUser = async (req, res) => {
    try{
    const {name,email,password}=req.body;
    if(!name || !password || !email){
        return res.json({success:false,message:"Please fill all the fields"});
    }
    //validating email
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid email"});
    }

    //validating password
    if(password.length<8){
        return res.json({success:false,message:"Password must be at least 8 characters long"});
    }

    //hasing user password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const userData={
        name,
        email,
        password:hashedPassword
    }
    const newUser=new userModel(userData);
    const user=await newUser.save();
    // _id
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    return res.json({success:true,message:"User registered successfully",token});
    }catch(error){
        console.log(error);
       return res.json({success:false,message:error.message});
    }
}

// API to login user
const loginUser=async(req,res)=>{
    try {
       const {email,password}=req.body;
       const user=await userModel.findOne({email});
       if(!user){
           return res.json({success:false,message:"User not found"});
       }
       const isMatch=await bcrypt.compare(password,user.password);
       if(isMatch){
           const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
          return res.json({success:true,message:"User logged in successfully",token});
       }else{
           return res.json({success:false,message:"Invalid credentials"});
       } 
    } catch (error) {
        console.log(error);
       return res.json({success:false,message:error.message});
    }
}
export {registerUser,loginUser};