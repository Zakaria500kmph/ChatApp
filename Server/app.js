import express, { urlencoded } from "express";
import "dotenv/config"
import router from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Contacts_router from "./routes/contacts.router.js";
import SocketIo from "./socket.js";
import path from "path"

let app=express()
app.use(cookieParser()) // cookieParser() not cookieParser
const options={
    origin:process.env.Client,
    withCredentials:true
}
app.use("/upload/profile",express.static("/upload/profile"))
app.use("/upload/files",express.static("/upload/files"))
app.use(cors(options))
app.use(express.urlencoded({limit:"16kb"}))
app.use(express.json({limit:"16kb"}))

app.use("/api/v1",router)
app.use("/api/v1/contacts",Contacts_router)
const server=app.listen(process.env.PORT,()=>{
    console.log("this port is running",process.env.PORT)
})
SocketIo(server)

export default app