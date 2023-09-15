import express, { urlencoded } from "express";
//router ko connect krenge 
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express();

//config wale file ki path 
config({
    path:"./data/config.env", 
})

//using middleware json data access krne ke liye kyuki req.body me kuch nhi hai
app.use(express.json()); // isko uppar rkhna padega kyuki jabtak hum koi route aur contraoller use nhi krenge tab tk ye use nhi hoga 
// using cookie parser 
app.use(cookieParser());

// using cors   
app.use(cors({
origin: [process.env.FRONEND_URL],
methods: ["GET", "POST" , "PUT" , "DELETE"],
credentials:true,  //headers or cookies pahuchane ke liye isko true rakhna padega
}))


// using Routes 
app.use("/api/v1/users" ,userRouter)       // /api/v1 means hum api use kr rhe hai with version 1
app.use("/api/v1/task" ,taskRouter)  

app.get( "/" , (req,res) => {
    res.send("working nice")
})

// Error Handling in Nodejs 
// how to handle erorr using next() method 
app.use(errorMiddleware)