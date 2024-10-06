import {server as socketIOServer} from "socket-io"

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
    io.on("connection",(socket)=>{
        const userId=socket.handshake.query.userId
        if(userId){
            socketsMap.set(userId,socket.id)
            console.log("User with ",userId," is connected to SocketId ",socket.id)
        }else{
            console.log("PLease Provide UserId carefully")
        }
        io.on("disconnect",(socket)=>disconnectIO(socket))
    })
}
export default SocketIo