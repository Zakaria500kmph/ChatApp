import { createContext ,useContext,useRef,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux"
import {io} from "socket.io-client"
import { contactsAction } from "../../store/slices";
const socketContext=createContext(null)
export const useSocket=()=>{
  return useContext(socketContext)
}
export const SocketProvider=({children})=>{
  const dispatch=useDispatch()
    const userInfo=useSelector((store)=>store.userInfo)
    const id=userInfo?.user?._id
    const socket=useRef()
    const contactsInfo=useSelector((store)=>store.contactsInfo)
    const contactsInfoRef = useRef(contactsInfo);
    useEffect(()=>{
      contactsInfoRef.current = contactsInfo;
    },[contactsInfo])
    useEffect(()=>{
          socket.current=io("http://localhost:8080/",{
            withCredentials:true,
            query:{userId:id}
          })
          socket.current.on("connect",()=>{console.log("Connected to socket Server")})

          function handleMessage(message){
            const {chatType,contacts}=contactsInfoRef.current
               if(chatType!==undefined && (contacts._id===message.sender._id || contacts._id===message.receiver._id)){
                dispatch(contactsAction.setSelectedChatMessages(message))
               }
          }
          socket.current.on("recieveMessage",handleMessage)
          return ()=>{
              socket.current.disconnect()
            }
    },[userInfo,dispatch])
   return<socketContext.Provider value={socket.current}>
    {children}
   </socketContext.Provider>
}