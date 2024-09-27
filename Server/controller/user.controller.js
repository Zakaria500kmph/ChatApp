import asyncHandler from "../utils/asyncHandler.js";
import {apiError} from "../utils/errorHandler.js"
import { User } from "../models/user.model.js";
import { responseHandler } from "../utils/responseHandler.js";
import jwt from "jsonwebtoken"
import fs from "fs"
import { uploadToFirebase } from "../utils/uploadTofirebase.js";


const generatedRefreshAndAccessToken=async (userId)=>{
    const user=await User.findOne(userId)
    const  accessToken=await user.generateAccessToken()

    const refreshToken =await user.generateRefreshToken()
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})
    return [accessToken,refreshToken]
} 

const RegisterUser=asyncHandler(async(req,res)=>{
    const {username,password,email}=req.body
    if([username,password,email].some((i)=>i.trim()=="")){
        throw new apiError("Please Enter all fields carefully!!!!!",400)
    }
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new apiError("User ALready exist",400)
    }
    const userDet=await User.create({
        username,
        password,
        email,
        refreshToken:User.generateRefreshToken,
        
    })
    if(!userDet){
        throw new apiError("Internal Server Error",500)
    }
    res.status(200).json(new responseHandler("User created successfully",200,userDet))
})


const LoginUser=asyncHandler(async (req,res,next)=>{
    const {username,password}=req.body
    if([username,password].some((e)=>e.trim()=="")){
        throw new apiError("PLease Enter all fields carefully",400)
    }
    const user=await User.findOne({username})
    if(!user){
        throw new apiError("No user with this email and username found",404)
    }
    const password_outcome=user.isPasswordCorrect(password)
    if(!password_outcome){
        throw new apiError("please Enter valid password",400)
    }
    const option ={
        secure:true,
        httpOnly:true
    }
    user.password=""
    const [refreshToken,accessToken]= await generatedRefreshAndAccessToken(user._id)
    res.status(200).cookie("refreshToken",refreshToken,option).cookie("accessToken",accessToken,option).json( new responseHandler("user Login successfully",200,user))
})

const userInfo=asyncHandler(async(req,res,next)=>{
  const {accessToken}=req.cookies
  if(!accessToken){
      throw new apiError("You are not authenticated",400)
    }
    const info=await jwt.verify(accessToken,process.env.RefreshTokenSecret)
    const user=await User.findById(info?.id)
    res.send(user)
})

const SetupProfile=asyncHandler(async(req,res)=>{
    const {firstName,lastName}=req.body
    if([firstName,lastName].some((i)=>i.trim()=="")){
        throw new apiError("Please Enter all fields are compulsory")
    }
    const user=await User.findById(req.info.id)
    if(!user){throw new apiError("Internal server Error",500)}
    user.firstName=firstName
    user.lastName=lastName
    user.profileSetup=true
    await user.save({validateBeforeSave:false})
    res.status(200).json( new responseHandler("Successfully updated !!!",200,user))
})

const updateDp=asyncHandler(async (req,res)=>{
    const file=req.file
    if(!file){
        throw new apiError("Please choose a valid image",404)
    }
    const date = Date.now()
    const name= "upload/profile"+date+file.originalname
    fs.renameSync(file.path,name)
    const ProfileImage= await uploadToFirebase(name,file.originalname)
    const user=await User.findById(req.info.id)
    user.image=ProfileImage
    user.save({validateBeforeSave:false})
    res.status(200).json( new responseHandler("Successfully updated !!!",200,user))

})

const logout=asyncHandler(async(req,res)=>{
    const user=req.info
    const userNew=await User.findByIdAndUpdate(user.id,{
        $set:{
            refreshToken:""
        }
    },{new:true})
    const option={
        "httpOnly":true,
        "secure":true
    }
    res.status(200).clearCookie("refreshToken",option).clearCookie("accessToken",option).json(200)
})
export {LoginUser,RegisterUser,userInfo,SetupProfile,updateDp,logout}