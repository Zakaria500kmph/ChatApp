import express, { urlencoded } from "express";
import "dotenv/config"
import router from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import asyncHandler from "./utils/asyncHandler.js";
import {Name} from "./utils/helper.js"

let app=express()
app.use(cookieParser()) // cookieParser() not cookieParser
const options={
    origin:process.env.Client,
    withCredentials:true
}
app.use("/upload/profile",express.static("/upload/profile"))
app.use(cors(options))
app.use(express.urlencoded({limit:"16kb"}))
app.use(express.json({limit:"16kb"}))
app.use(express.static("./public"))

app.use("/api/v1",router)
app.listen(process.env.PORT,()=>{
    console.log("this port is running",process.env.PORT)
})


export default app