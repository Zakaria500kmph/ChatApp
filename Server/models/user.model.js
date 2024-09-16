import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=mongoose.Schema({
    username:{
        type:"String",
        required:true,
        unique:true
    },
    email:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    firstName:{
      type:"String",
      required:false
    },
    lastName:{
        type:"String",
        required:false
      },
    image:{
        type:"String",
        required:false
    },
    image:{
        type:"String",
        required:false
      },
    color:{
        type:"String",
        required:false
      },
    profileSetup:{
        type:"Boolean",
        required:false,
        default:false
      },
    refreshToken:{
        type:"String"
    }
},{timestamps:true})
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
        next()
    }
   next()
})
userSchema.methods.isPasswordCorrect=async function (password_input){
    return await bcrypt.compare(password_input,this.password)
}
userSchema.methods.generateAccessToken=async function (){
    return await jwt.sign({
        id:this._id,
        email:this.email
    },process.env.AccessTokenSecret,{expiresIn:process.env.AccessTokenExpiry})
}
userSchema.methods.generateRefreshToken=async function (){
    return await jwt.sign({
        id:this._id
    },process.env.RefreshTokenSecret,{expiresIn:process.env.refreshTokenExpiry})
}
export const User=mongoose.model("User",userSchema)

 