import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef,useState } from 'react';
import moment from "moment"
import FetchMessage from '../helper/fetchMessage';
import { contactsAction } from '../../store/slices';
import { IoClose } from "react-icons/io5";
import { MdDownload } from "react-icons/md";
import axios from 'axios';


function Messagebody() {
  const [showImage,setShowImage]=useState(false)
  const [fileUrl,setFileUrl]=useState("null")
  const dispatch=useDispatch()
  const scrollRef=useRef();
  const {chatType,contacts,selectedChatMessages}=useSelector((store)=>store.contactsInfo)
  const user=useSelector((store)=>store.userInfo.user)
useEffect(()=>{
  const getMessages = async () => {
    const response = await FetchMessage(contacts._id);
    const payload=response.data.messages
    if(response.status=200){
        dispatch(contactsAction.setSelectedChatMessagesArray(payload));
    }
  }
  getMessages()
},[])
  const renderDmMessages=(message)=>{
   
    function ImagesHandler(e){
      setFileUrl(e.file)
      setShowImage(true)
    }
        return <div className='flex pr-4' >
        <div className={`${contacts._id===message.sender && "text-right ml-auto"}`} >
      <div className={`${contacts._id===message.sender ? "bg-purple-600 text-white":"bg-slate-900 text-white"} max-w-[50%] min-w-[100%] break-words mx-2 mt-3 rounded-2xl p-3`}>
        {message.message ? message.message:<object data={message.file} onClick={()=>ImagesHandler(message)} width={"300px"}></object>}
        </div>
        <div className='text-xs text-slate-400 ml-4'>{moment(message.timestamps).format("LT")}</div>
    </div></div>}
  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[selectedChatMessages]);
  const renderMessages=()=>{
    let lastDate=null;
    return selectedChatMessages.map((message,index)=>{
      const messageDate=moment(message.timestamps).format("YYYY-MM-DD");
      const showDate=lastDate!==messageDate
      lastDate=messageDate
      return <div key={index} ref={scrollRef}>
         {showDate && <div className='text-center text-slate-400'>
          {moment(message.timestamps).format("LL")}</div>
          }
          { 
            chatType==="Chat" &&  renderDmMessages(message) 
          }

      </div>
  })}
  return<div className="w-full h-[74vh] bg-slate-600 relative flex-1 px-3 overflow-y-scroll"  >
    {showImage && (
      <div>
     
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
  <IoClose className='absolute size-[40px] left-[26%] top-[8%]' onClick={()=>setShowImage(false)}/>  
    <object data={fileUrl} className="w-full h-full max-w-[600px] max-h-[400px]" />
  </div>
  </div>
)}

    {renderMessages()}
    
</div>
}
  


export default Messagebody