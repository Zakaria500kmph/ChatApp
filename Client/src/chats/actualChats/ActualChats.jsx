import Det from "../../messages/Dets.jsx"
import Messagebody from "../../messages/Messagebody.jsx"
import SendUtils from "../../messages/SendUtils.jsx"

function ActualChats() {
  return (
    <div className="bg-slate-800 text-white h-[100%] w-full">
        <Det/>
        <Messagebody/>
        <SendUtils/>
    </div>
  )
}

export default ActualChats