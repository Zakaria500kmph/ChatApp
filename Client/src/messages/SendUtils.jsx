import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { useRef,useState } from "react";
import EmojiPicker from 'emoji-picker-react'
function SendUtils() {
  let[emojiPickerOpen,setemojiPickerOpen]=useState(false)
  let [Message,setMessage]=useState("")
function handleEmoji(emoji){
  setMessage((Message)=>Message+emoji.emoji)
}
  function HandleSend(){
     console.log(Message.current.value)
  }
  
  return (
    <div className='h-[8vh] items-center flex '>
      <input type="text" className='w-[85%]  ml-4 rounded-xl bg-slate-700 pl-6 h-8' placeholder='Enter the Message Here' value={Message} onChange={(e)=>setMessage(e.target.value)}></input>
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
      <GrAttachment className="size-[35px] pl-2 text-slate-500 hover:text-white"/>
      </button>
      
      <button>
      <IoSend className="size-[40px] px-2 text-purple-700 hover:text-purple-500 hover:size-[60px] hover:transition-all hover:duration-300" onClick={HandleSend}/>
      </button>
    </div>
  )
}

export default SendUtils