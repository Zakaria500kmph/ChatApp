import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Chats from "../chats/index"
import { useEffect, useState } from "react"

export default function Browser() {
  const navigate=useNavigate()
  const data=useSelector(store=>store?.userInfo?.user)
 useEffect(()=>{
  if(!data?.profileSetup){
    navigate("/profile")
  }
 },[])
  return (
    <>
    <Chats/>
    </>
  )
}
