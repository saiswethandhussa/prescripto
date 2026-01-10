// import jwt from 'jsonwebtoken'

// //user authentication middleware
// const authUser= async(req,res,next)=>{
//     try{
//    const {token}=req.headers
//    if(!token){
//     return res.json({success:false,message:"Not Authorized Login Again"})}
//     const token_decode=jwt.verify(token,process.env.JWT_SECRET)
//     req.body.userId=token_decode.id
//     // req.userId = decoded.id;       // ✅ correct


//    next()
//     }catch(error){
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }
// export default authUser
import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const token =
      req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👇 attach user id safely
    req.userId = decoded.id;

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authUser;

