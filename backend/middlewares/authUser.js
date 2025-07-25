import jwt from 'jsonwebtoken';
const authUser=async(req,res,next)=>{
    try{
        const {token}=req.headers;
        // console.log(token);
        if(!token){
            return res.json({success:false,message:"Not Authorized ,Login again"});
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(token_decode);
        req.body={  ...req.body,   userId:token_decode.userId};
        // console.log(req.body);
        next();
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export default authUser