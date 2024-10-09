import {Server as socketIOServer} from "socket.io"
import { Message } from "./models/message.model.js";

function SocketIo(server){
    const io=new socketIOServer(server,{
        cors:{
            origin:process.env.Client,
            methods:["POST","GET"],
            credentials:true
        }
    });
    const socketsMap=new Map()
    function disconnectIO(socket){
        console.log("user is Disconnected")
        for(const [ userId , socketId] of socketsMap){
            if(socketId===socket.id){
                socketsMap.delete(userId);
                break
            }
        }
    }
    const sendMessage=async (message)=>{
        const senderSocketId=socketsMap.get(message.sender)
        const recieverSocketId=socketsMap.get(message.reciever)
        const createdMessage=await Message.create({message})
        const populatedMessage=await Message.findById(createdMessage._id).populate("sender","email,firstName,lastName,image,_id").populate("receiver","email,firstName,lastName,image,_id")

        if(senderSocketId){ io.to(senderSocketId).emit("recieveMessage",populatedMessage) }
        if(recieverSocketId){ io.to(recieverSocketId).emit("recieveMessage",populatedMessage) }

    }
    
    io.on("connection",(socket)=>{
        const userId=socket.handshake.query.userId
        if(userId){
            socketsMap.set(userId,socket.id)
            console.log("User with ",userId," is connected to SocketId ",socket.id)
        }else{
            console.log("PLease Provide UserId carefully")
        }
        socket.on("sendMessage",sendMessage)
        socket.on("disconnect",()=>disconnectIO(socket))
    })
}
export default SocketIo