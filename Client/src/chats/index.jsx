
import ActualChats from './actualChats/ActualChats'
import Contacts from './Contacts/Contacts'
import EmptyChat from './EmptyChat/EmptyChat'

function Chats() {
  return (<div className='flex w-full h-[100vh]'>
    <Contacts/>
    {/* <ActualChats/> */}
    <EmptyChat/>
  </div>

  )
}

export default Chats