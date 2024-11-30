import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import {  useRef,useState } from "react";
import EmojiPicker from 'emoji-picker-react'
import { useSocket } from "../context/contextSocket";
import { useSelector } from "react-redux";
import axios from "axios"
function SendUtils() {
  const socket=useSocket()
  const {chatType,contacts,selectedChatMessages}=useSelector((store)=>store.contactsInfo)
  const {user}=useSelector((store)=>store.userInfo)
  const fileRef=useRef()
  let[emojiPickerOpen,setemojiPickerOpen]=useState(false)
  let [Message,setMessage]=useState("")
function handleEmoji(emoji){
  setMessage((Message)=>Message+emoji.emoji)
  }
  function HandleSend(){
     if(chatType==="Chat"){
       socket.emit("sendMessage",{
         sender:user._id,
         receiver:contacts._id,
         messagesType:"text",
         content:Message,
         fileUrls:undefined
        })
        setMessage("")
     }
  }
  async function fileUploadClick(){
    fileRef.current.click()
  }
function isImage(type){
  const imageRegex = /\/(jpg|jpeg|png|gif|bmp|webp)$/i;
  return imageRegex.test(type)

} 
 async function FileUpload(e){
  try{

    const file=e.target.files[0]
    if(isImage(file.type)){
      const options={
        "withCredentials":true,
      }
      const newFile= new FormData()
      newFile.append("file",file)
     const res=await axios.post("/contacts/File",newFile,options) 
     console.log(res.data.url)
    }
  }catch{
    console.log("Error occured during file attachment")
  }
  }
  return (
    <div className='h-[8vh] items-center flex '>
      <input type="text" className='w-[85%]  ml-4 rounded-xl bg-slate-700 pl-6 h-8' placeholder='Enter the Message Here' value={Message} onChange={(e)=>setMessage(e.target.value)}></input>
      <button onClick={()=>fileUploadClick()}>
      <GrAttachment className="size-[35px] pl-2 text-slate-500 hover:text-white">
      </GrAttachment>
      </button>
      <button> 
        <input type="file" ref={fileRef} onChange={(event)=>FileUpload(event)} className="hidden" />
      </button>
      <button onClick={()=>setemojiPickerOpen(!emojiPickerOpen)}>
  
  <RiEmojiStickerLine className="size-[40px] pl-4 text-slate-500 hover:text-white"/>
 
</button>
<div className="absolute bottom-[8vh] right-0" id="10">
<EmojiPicker 
theme="dark" 
open={emojiPickerOpen}
onEmojiClick={handleEmoji}
autoFocusSearch={false}/>
</div>

      
      
      <button>
      <IoSend className="size-[40px] px-2 text-purple-700 hover:text-purple-500 hover:size-[60px] hover:transition-all hover:duration-300" onClick={HandleSend}/>
      </button>
    </div>
  )
}

export default SendUtils