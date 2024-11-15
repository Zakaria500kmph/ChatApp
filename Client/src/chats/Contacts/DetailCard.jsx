import {useDispatch} from "react-redux"
import { contactsAction } from "../../../store/slices"
function DetailCard({profile,Set}) {
   const contacts=profile
   const dispatch=useDispatch()
   function changeHandler(i){
     dispatch(contactsAction.setContacts(i))
     dispatch(contactsAction.Setup())
     Set(false)
   }
  return (
    <div onClick={()=>console.log("item clicked with id as")}>
        {contacts.map((i)=><div className='' key={i._id} >
            <div className='flex hover:cursor-pointer' onClick={()=>changeHandler(i)}>
            <img src={i?.image || "https://firebasestorage.googleapis.com/v0/b/chatapp-58e21.appspot.com/o/skeleton-character-with-glow-dark-skin-avatar-profile-picture_19361-348.jpg?alt=media&token=e71705af-e17e-4292-92e6-878fea38082a"} alt="photo" className='w-20 h-20 rounded-full'/>
            <p className='pl-3'>{i.firstName}</p>
            <p className='pl-3'>{i.lastName}</p>
            </div>
        </div>)}
    </div>
  )
}

export default DetailCard