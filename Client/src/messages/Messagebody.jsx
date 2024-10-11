import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import moment from "moment"
 
function Messagebody() {
  const scrollRef=useRef();
  const {chatType,contacts,selectedChatMessages}=useSelector((store)=>store.contactsInfo)
  const user=useSelector((store)=>store.userInfo.user)

  const renderDmMessages=(message)=>{
    
        return <div className='flex pr-4'>
        <div className={`${contacts._id===message.sender && "text-right ml-auto"}`} >
      <div className={`${contacts._id===message.sender ? "bg-purple-600 text-white":"bg-slate-900 text-white"} max-w-[50%] min-w-[100%] break-words mx-2 mt-3 rounded-2xl p-3`}>
        {message.message}
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
    {renderMessages()}
</div>
}
  


export default Messagebody