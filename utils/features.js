import jwt from "jsonwebtoken"

export const sendCookie = (user , res , message , statusCode=200) => {
    const token = jwt.sign({ _id:user._id }, process.env.JWT_SECRET) //JWT_SECRET-> is any random secret like we made in nodejs-api app

    res.status(statusCode)
    .cookie("token" ,token,{
     httpOnly: true,
     maxAge: 15*60*1000,
     //sameSite has three properties lax , "" , strict read it on google why it is used 
     sameSite:process.env.NODE_ENV ==="Development" ? "lax" : "none", // login ke time cookie nahi ayegi 
     secure:process.env.NODE_ENV==="Development" ? false : true,
})
    .json({    //user created 
     success:true,  
     message,
})
}