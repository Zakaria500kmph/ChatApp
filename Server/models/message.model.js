import mongoose from "mongoose"
import { User } from "./user.model.js"
const messageSchema=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    messagesType:{
        type:String,
        enum:["files","text"],
        required:true
    },
    content:{
        type:String,
        required: function (){return this.messagesType=="text"} // i use normal function not arrow function purposely
    },
    fileUrls:{
        type:String,
        required:function (){
            return this.messagesType=="file"
        }
    },
    timestamps:{
        type:Date,
        default:Date.now,
    }
})
export const Message=mongoose.model("Message",messageSchema)