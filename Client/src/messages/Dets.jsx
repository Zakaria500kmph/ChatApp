import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { contactsAction } from "../../store/slices";
function Dets() {
  const user=useSelector((store)=>store.contactsInfo.contacts)
  const dispatch=useDispatch()
  function closeHandler(){
    dispatch(contactsAction.Setup())
  }
  return (
    <div className="w-full h-[18vh] flex border-solid 
        border-[1px] border-gray-500">

          <div className=" flex text-2xl pt-3 pl-4">
            <img src={user.image || "https://firebasestorage.googleapis.com/v0/b/chatapp-58e21.appspot.com/o/skeleton-character-with-glow-dark-skin-avatar-profile-picture_19361-348.jpg?alt=media&token=e71705af-e17e-4292-92e6-878fea38082a"} alt="photu" className="rounded-full w-[80px] h-[80px]" />
            <div className="p-[20px] ">
          {user.firstName}
            </div>
            <div className=" p-[20px]">
          {user.lastName}
            </div>

          </div>
    <button className="absolute right-0 m-4 text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
    <IoClose className="size-[40px]" onClick={()=>closeHandler()}/>
    </button>
    </div>
  )
}

export default Dets