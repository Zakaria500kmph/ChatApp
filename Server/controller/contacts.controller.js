import asyncHandler from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {apiError} from "../utils/errorHandler.js"
import {responseHandler} from "../utils/responseHandler.js"

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
export {Search}