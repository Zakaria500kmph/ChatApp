import { useEffect, useState} from 'react'
import Login from './Utils/login.jsx'
import axios from 'axios'
import { userAction } from '../store/slices'
import {useDispatch, useSelector} from "react-redux"
import Browser from "./Utils/Browser.jsx"
import Profile from "./Utils/Profile.jsx"
function App() {
  const dispatch=useDispatch()
 let User=""
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
},[Userget,])
const data=useSelector(store=>store.userInfo?.user)

  return <>
  {!data ? <Login setUser={setUser}/>:(data?.profileSetup?<Browser/>:<Profile/>)}
  </>
  
}

export default App
