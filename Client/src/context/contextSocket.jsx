import { createContext ,useContext,useRef,useEffect } from "react";
import {useSelector} from "react-redux"
import {io} from "socket.io-client"
const socketContext=createContext(null)
export const SocketProvider=({children})=>{
    const userInfo=useSelector((store)=>store.userInfo)
    const contactsInfo=useSelector((store)=>store.contactsInfo)
    const id=userInfo?.user?._id
    const socket=useRef()
    useEffect(()=>{
          socket.current=io("http://localhost:8080",{
            withCredentials:true,
            query:{userId:id}
          })
          socket.current.on("connect",()=>{console.log("Connected to socket Server")})

          function handleMessage(message){
               const {chatType,contacts}=contactsInfo
               if(chatType!==undefined && (contacts._id===message.sender._id || contacts._id===message.reciever._id)){
                
               }
          }
          socket.current.on("recieveMessage",handleMessage)
          return ()=>{
              socket.current.disconnect()
            }
    },[userInfo])
   return<socketContext.Provider value={socket.current}>
    {children}
   </socketContext.Provider>
}