import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
//API for adding doctor
const addDoctor=async(req,res)=>{
    try{
    const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
    const imageFile=req.file;
    // console.log({name,email,password,speciality,degree,experience,about,fees,address,imageFile});
   // checking if all fields are filled
    if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile){
        return res.json({success:false,message:"Please fill all the fields"});
    } 

    // validating email format
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid email"});
    }

    // validating password strength
   if(password.length<8){
        return res.json({success:false,message:"Password must be at least 8 characters long"});
    }

    //hashing doctor's password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
//   console.log(salt);
//   console.log(hashedPassword);


    //upload image to cloudinary
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{
        resource_type:"image",
    });
    const imageUrl=imageUpload.secure_url;

    //doctors data
    const doctorData={
        name,
        email,
        password:hashedPassword,
        image:imageUrl,
        speciality,
        degree,
        experience,
        about,
        fees:parseInt(fees),
        address:JSON.parse(address),
        date:Date.now(),
    };
    
    const newDoctor=await doctorModel(doctorData);
    await newDoctor.save();

    res.json({success:true,message:"Doctor added successfully"});
}catch(error){
  console.log(error);
  res.json({success:false,message:error.message});
    }
}

// API for the admin login
const loginAdmin=async(req,res)=>{
    try{
    const {email,password}=req.body;
    if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true,message:"Admin Login successful",token:token});
    }
    else{
        return res.json({success:false,message:"Invalid credentials"});   
    }
}
    catch(error){
  console.log(error);
  res.json({success:false,message:error.message});
    }
}

// api to get all doctors list from admin panel
const allDoctors=async (req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password');
        res.json({success:true,data:doctors});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export {addDoctor,loginAdmin,allDoctors};