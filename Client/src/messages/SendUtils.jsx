import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";


function SendUtils() {
  return (
    <div className='h-[8vh] items-center flex'>
      <input type="text" className='w-[85%]  ml-4 rounded-xl bg-slate-700 pl-6 h-8' placeholder='Enter the Message Here ' />
      <button>
      <RiEmojiStickerLine className="size-[40px] pl-4 "/>
      </button>
      <button>
      <GrAttachment className="size-[35px] pl-2"/>
      </button>
      <button>
      <IoSend className="size-[40px] px-2"/>
      </button>
    </div>
  )
}

export default SendUtils