import { useDispatch } from "react-redux"
import { contactsAction } from "../../../../store/slices"
function ContactShowCard({item}){
    const dispatch=useDispatch()
    function OpenChat(i){
      dispatch(contactsAction.setChatType("Chat")) 
      dispatch(contactsAction.Setup()) 
      dispatch(contactsAction.setContacts(item))
    }
    return  <div className="my-2 border-[1px] border-black border-solid w-[95%] ml-1  flex cursor-pointer" onClick={()=>OpenChat(item._id)}>
    <img src={item?.image?`${item.image}`:"https://firebasestorage.googleapis.com/v0/b/chatapp-58e21.appspot.com/o/skeleton-character-with-glow-dark-skin-avatar-profile-picture_19361-348.jpg?alt=media&token=e71705af-e17e-4292-92e6-878fea38082a"} alt="profile" className="size-16 m-2 rounded-full" />
        <div>
            {item.username}
            <div className="text-[10px] text-slate-400">
               Last Message On : {item.LastMessage.slice(0,10)}
            </div>
            <div className="text-[10px] text-slate-300">
                {item.email}
            </div>
            </div>
    </div>
}
export default ContactShowCard