import { useSelector } from "react-redux"
import Det from "../../messages/Dets.jsx"
import Messagebody from "../../messages/Messagebody.jsx"
import SendUtils from "../../messages/SendUtils.jsx"
import {UploadfileUI} from "../../messages/UploadfileUI.jsx"

function ActualChats() {
  let isUploading=useSelector((store)=>store.uploads?.isUploading)
  return (
    <div className="bg-slate-800 text-white h-[100%] w-full">
        <Det/>
        {
         isUploading ?<UploadfileUI/>:<Messagebody/>
        }
        <SendUtils/>
    </div>
  )
}

export default ActualChats