import app from "./app.js";
import "dotenv/config";
import mongoose from "mongoose";

async function db(){
    try {
        const connectionInstance= await mongoose.connect("mongodb+srv://Zakaria:Backend123@cluster0.qqndikg.mongodb.net/ChatAPP")
        console.log("Databse is connected",connectionInstance.connection.host)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
db()