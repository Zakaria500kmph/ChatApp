import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Chats from "../chats/index"

export default function Browser() {
  const navigate=useNavigate
  const data=useSelector(store=>store.userInfo.user)
  if(!data.profileSetup){
    navigate("/profile")
  }
  return (
    <>
    <Chats/>
    </>
  )
}
