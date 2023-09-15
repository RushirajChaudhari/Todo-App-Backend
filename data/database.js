import mongoose from "mongoose";

// connecting with mongoose 
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI , {
        dbName : "backendapi",
    })
    .then( (c) => {console.log(`Database Connected with ${c.connection.host} `)})
    .catch((e) => {console.log(e)})
} 


// we installed a package dotenv 
// now we have given the mongodb database consider changing the mongodb database to cloud database 