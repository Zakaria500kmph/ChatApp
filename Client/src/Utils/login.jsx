import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
function Login() {
    let [login,setLogin]=useState(true)
    let [signup,setsignup]=useState(false)
    let username=useRef()
    let password=useRef()
    let email=useRef()
    const navigate=useNavigate()
    const info=useSelector((store)=>store?.userInfo?.user)
useEffect(()=>{
    if(info){
        navigate("/intermediate")
    }
})
   async function onSubmitHandler(e){
        e.preventDefault()
        if(login){
           try {
             const options={"username":username.current.value,"password":password.current.value}
             const config={
                 header:{
                  "Content-Type":"application/json"},
                  withCredentials:true
             }
            
             const res=await axios.post("/v1/login",options,config)
             if(res.data.statusCode==200){
                 console.log(res.data.data.profileSetup)
                 navigate("/intermediate")
             }
            
           } catch (error) {
            toast.error("Error")
           }
        }
        else if(signup){
            try {
                const options={"username":username.current.value,"email":email.current.value,"password":password.current.value}
            const config={
                headers:{"Content-Type":"application/json"},
                withCredentials: true
            }


            const response= await axios.post("/v1/reg",options,config)
            console.log(response.data.statusCode===200)
           if(response.status===200){
            setsignup(false)
            setLogin(true)
            navigate("/profile")
           }
            } catch (error) {
                toast.error("error")
            }
            
        }
        else{

            toast.error("Please choose either Signup or Login")
        }
        
    }
    function loginHandler(){
        setLogin(!login)
        if(!login){
            setsignup(false)
        }

    }
    function signupHandler(){
        setsignup(!signup)
        if(!signup){
            setLogin(false)
        }
    }
  return (<div className='relative top-[90px] left-[180px] text-center w-[60%] h-[450px] shadow-2xl'>
    <Toaster />
    <div className='' >
  <div className='flex items-center pl-[27%]'>
        <h1 className="text-5xl font-semi-bold">Welcome</h1>
        <img src="./src/assets/victory.svg" alt="Logo"  className='w-20 h-20'/> 
    </div>
    <p className='font-sans py-3 text-left pl-[27%]'>Enter Your Detail to Get Started</p>
  </div>
  <div className="">
    <div className='flex pl-[27%]'>
        <p className={`w-[30%]  ${login && "border-b-4 border-b-blue-500 "} hover:cursor-pointer`} onClick={loginHandler}>Login</p>
         <p className={`w-[30%]  ${signup && "border-b-4 border-b-blue-500"} hover:cursor-pointer`} onClick={signupHandler}>SignUp</p>
    </div>
    <div className='text-start pl-[27%]'>
        <form action="submit" onSubmit={onSubmitHandler}>
        <p className='font-semibold pt-2'>Username</p>
        <input type="text" placeholder='Enter a Unique Username' ref={username} />
            <p className={`font-semibold py-2 h-[18px] ${login &&"hidden"}`}>Email</p>
            <input type="email" placeholder='Enter Your Email ' className={`${login &&"hidden"}`} ref={email}/>
            <p className=' font-semibold py-2 h-2'>Password</p>
            <input type="password" placeholder='Enter a unique Password' ref={password} />
            <button className='block my-8 mx-[15%] bg-slate-700 h-10 w-40 rounded-xl text-white'>{signup&&"SignUp "} {login&&"Login"} {!(signup||login)&&"Welcome"}</button>
        </form>
    </div>
  </div>
    </div>
  )
}

export default Login