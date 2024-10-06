
import { useSelector } from 'react-redux'
import ActualChats from './actualChats/ActualChats'
import Contacts from './Contacts/Contacts'
import EmptyChat from './EmptyChat/EmptyChat'

function Chats() {
  const contacts=useSelector((store)=>store.contactsInfo.setup)

  return (<div className='flex w-full h-[100vh]'>
    <Contacts/>
    {contacts ? <ActualChats/>:<EmptyChat/> }
  </div>

  )
}

export default Chats