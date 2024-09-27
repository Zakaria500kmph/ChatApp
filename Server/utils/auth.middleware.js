import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { apiError } from "./errorHandler.js";
const auth =asyncHandler(async (req,res,next)=>{
const refreshToken=req.cookies.refreshToken
const info =jwt.verify(refreshToken,process.env.AccessTokenSecret)

if(!info){
    throw new apiError("You are not authenticated",400)
}
const record=await User.findById(info.id)
if(!record){
    throw new apiError("Something went wrong",405)
}
    req.info=info
    next()
})
export default auth