// npm i jsonwebtoken  --> because we will be using cookie for authentication 
// this folder is to store all the functions 
import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js";


export const login = async(req,res,next) => {
   try {
    const {email , password} = req.body
    const user = await User.findOne({email}).select("+password")

    if (!user) 
    return res.status(404).json({
     success:false,
     message: "Invalid email or password",
});

const isMatch = await bcrypt.compare(password , user.password)

if (!isMatch) 
return res.status(404).json({
 success:false,
 message: "Invalid email or password",
});

sendCookie(user , res , `Welcome Back, ${user.name}`, 200 )
   } catch (error) {
    next(error)
   }
}


export const register = async (req,res,next) => {
try {
    const {name, email, password} = req.body;

// user dhundenge
let user = await User.findOne({email})

// agar user hai 
if (user) 
    return res.status(404).json({
     success:false,
     message: "User Already Exists",
});

const hasshedPassword = await bcrypt.hash(password, 10) // hasshed password with length 10

// agar user nahi exist krta 
user = await User.create({name , email ,password:hasshedPassword })

// generating a jwt token 
const token = jwt.sign({ _id:user._id }, process.env.JWT_SECRET) //JWT_SECRET-> is any random secret like we made in nodejs-api app
// cokkies ke liye ek alag se function banaya hai features wale file me 

sendCookie(user , res , "Registered Successfully" ,201)

} catch (error) {
 next(error)   
}
}


export const getMyProfile = (req,res) => {
// const id = "myid";

res.status(200).json({
    success:true,
    user: req.user,
});
}

export const logout = (req,res) => {

res.status(200).cookie("token", "", {
    expires: new Date(Date.now()),
    sameSite:process.env.NODE_ENV ==="Development" ? "lax" : "none", // login ke time cookie nahi ayegi 
    secure:process.env.NODE_ENV==="Development" ? false : true,
})
.json({  //logout krne ke liye cookie expire kr di
    success:true,
    user: req.user,
});
};


  