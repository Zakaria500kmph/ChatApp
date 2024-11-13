import asyncHandler from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {apiError} from "../utils/errorHandler.js"
import {responseHandler} from "../utils/responseHandler.js"
import { Message } from "../models/message.model.js" 
import mongoose from "mongoose"
const Search=asyncHandler(async(req,res)=>{
    const {searchContacts}=req.body
    const seaechable=searchContacts.replace(/[.*+?${}()|[\]\\]/g, "\\$&") 
    // here g means global check all occurence not just first
    //what we are doing all these character a some meaning in regex so to make it safe we add /with each occurence of these char / means scape in regex

//[ and ]: Defines a character class, matching any one of the enclosed characters.

// .: Matches any character except newline.

// *: Matches 0 or more of the preceding element.

// +: Matches 1 or more of the preceding element.

// ?: Matches 0 or 1 of the preceding element.

// $: Matches the end of a string.

// { and }: Used for specifying a range or quantity.

// ( and ): Groups multiple tokens together.

// |: Acts as an OR operator.

// [ and \\ and ]: Matches literal [, \, and ] inside the character class.

// \: Escapes the next character, so it’s treated as a literal.
    const pattern = new RegExp(seaechable,"i")

    const user= await User.find({
        $and:[
            {_id:{$ne:req.info.id}},
            {
                $or:[{firstName:pattern},{lastName:pattern},{username:pattern}]
            }
        ]
    })
    if(!user){
        throw apiError("No user Found",404)
    }
   
    res.status(200).json(user)
    
    
})
const GetMessages=asyncHandler(async (req,res)=>{
   const User=req.info.id
   const {contact}=req.body
   if(!contact){
       throw new apiError("Please Provide the contact details",404)
    }
    const messages=await Message.find({
        $or:[
            {$and:[{sender:User},{receiver:contact}]},
            {$and:[{sender:contact},{receiver:User}]}
        ]
    }).sort({timestamps:"asc"})
    
    res.send({messages})
});
const GetAllContacts=asyncHandler(async(req,res)=>{
    const userId= new mongoose.Types.ObjectId(req.info.id)
    const userInfo=await Message.aggregate([
        {
            $match:{
                $or:[{"sender":userId},{"receiver":userId}]
            }
            
        },
        {$sort:{timestamps:-1}},
        {$group:{
            _id:{$cond:{
                if:{$eq:["$receiver",userId]},
                then :"$sender",
                else:"$receiver"
            }},
            LastMessage:{$first:"$timestamps"}
        }},
    {$lookup:{
        from:"users",
        localField:"_id",
        foreignField:"_id",
        as:"ContactInfo"
    }},
    {$unwind:"$ContactInfo"},
    {
        $project: {
            "LastMessage": 1,
            "_id": 1,
            "email": "$ContactInfo.email",
            "lastName": "$ContactInfo.lastName",
            "firstName": "$ContactInfo.firstName",
            "username": "$ContactInfo.username",
            "image": "$ContactInfo.image"
        }
    },{$sort:{timestamps:-1}}
    ])
    res.send(userInfo)
})
export { Search, GetMessages,GetAllContacts }