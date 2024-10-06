import { useState,useRef, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux"
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {userAction} from "../../store/slices"
function Profile() {
  const [hoverd,sethovered]=useState(false)
  const dispatch=useDispatch()
  const user= useSelector(store=>store.userInfo.user)
  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  },[])
 const [d,setd]=useState(false)
function hovering(){
    sethovered(true)
  }
  function nothovering(){
    sethovered(false)
  }
  const [useImage,setImage]=useState(`${user?.image ? user?.image : "https://th.bing.com/th/id/OIP.0IxGb16dYqy8akb1Ha0qsQHaEK?rs=1&pid=ImgDetMain"} `)
  const [dp,setdp]=useState(false)

async function ImageHandler(event){
  const file=event?.target.files[0]
if(file){
const formdata=new FormData()
formdata.append("profileImage",file)
const config={
  withcredential:true
   }
const response=await axios.post("/v1/updateDp",formdata,config)
   if(response.data.statusCode==200){
    let newuser={...user, image:response.data.data.image}
    dispatch(userAction.setUser(newuser))
    setd(true)
   }
  }
  
}


  const navigate=useNavigate()
  const firstname=useRef()
  const lastname=useRef()
  const image=useRef()

  async function SubmitHandler(e){
    e.preventDefault()
    const options={
      "firstName":firstname.current.value,
      "lastName":lastname.current.value
    }
    const config={
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"}
    }
    const res=await axios.patch("/v1/SetupProfile",options,config)
    if(res.data.statusCode===200){
      dispatch(userAction.setUser(res.data.data))
      toast.success(res.data.message)
      navigate("/browser")
    }
  }
  function Navigation(){
    navigate("/browser")
  }

  function ProfileComplete(){

  }
  
  
 
 


    return (<>
      <div className=" bg-slate-800 w-[100%] h-[100vh] flex">
        <div className="p-4">
        <IoArrowBackSharp className="text-white w-[40px] h-10 hover:cursor-pointer" onClick={Navigation}/>
        </div>
        <div className=" ml-[10%] mt-[175px] flex">
        <input type="file" ref={image} onChange={ImageHandler} className="absolute size-[200px] mt-[60px] opacity-0"  />
        <img src={useImage} alt="Avatar"  className={`w-40 h-40 rounded-full ${hoverd?"opacity-45":""}` }
        onMouseEnter={hovering}
        onMouseOut={nothovering}
        />
        
      <form className="flex-col  w-[184px] h-24 ml-[20%] " type="submit" onSubmit={SubmitHandler} >
        <input type="email" placeholder="Enter Your Email id"   className="h-10 mb-4 min-w-[250px] pl-7 rounded-xl bg-slate-500" value={user?.email} onChange={ProfileComplete}/>
        <input type="text" placeholder="Enter First Name"   className="h-10 mb-4 min-w-[250px] pl-7 rounded-xl bg-slate-500" ref={firstname} value={user?.firstName} onChange={ProfileComplete}/>
        <input type="text" placeholder="Enter Last Name"   className="h-10 mb-4 min-w-[250px] pl-7 rounded-xl bg-slate-500" ref={lastname} value={user?.lastName} onChange={ProfileComplete}/>
        <button className="h-10 mt-11 ml-6 rounded-3xl bg-purple-600 min-w-[200px]">Save Changes</button>
        </form>
        </div>
        </div>
      
      </>
    )
  }
export default Profile