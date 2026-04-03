import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path: './.env'
})

// console.log("ENV CHECK:", process.env.MONGO_URI); // 👈 DEBUG

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is Running at Port:${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("MongoDB connection Failed!!");
    
})


// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
/*import express from "express";
const app = express();
(async () => {
    try {
        await mongoose.connect(`{process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log(error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on Port ${process.env.PORT}`);

        })
    } catch (error) {
        console.error(error, "ERROR");
        throw err
    }
})() */


// function connectDB() {

// }
// "dev": " nodemon -r dotenv/config --experimental-json-modules src/index.js"