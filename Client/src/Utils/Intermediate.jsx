import { useDispatch } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { userAction } from "../../store/slices"
import Browser from "./Browser"
import Profile from "./Profile"
import { useNavigate } from "react-router-dom"
function Intermediate() {
  let User=""
  const dispatch=useDispatch()
  const navigate=useNavigate()
 const [Userget,setUser]=useState(false)
 useEffect(()=>{
  const getUser=async ()=>{
    try {
      User=await axios.get("/v1/userInfo")
    } catch (error) {
      console.log(error)
    }
    dispatch(userAction.setUser(User.data))

  }
  getUser()
},[])
const data=useSelector(store=>store.userInfo?.user)
if(data?.profileSetup){
  navigate("/browser")
}else{
  console.log(data)
  navigate("/profile")
}
  return <>
  </>
}

export default Intermediate