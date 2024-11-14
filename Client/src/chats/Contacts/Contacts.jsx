import logo from "../../../public/l.webp"
import {useSelector} from "react-redux"
import { CiEdit } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Dm from "./Dm";
import ContactsList from "./ContactsList/ConatctsList";

function Contacts() {
  const navigate=useNavigate()
  const user=useSelector((store)=>store?.userInfo?.user)
  const contactList=useSelector((store)=>store?.contactInfo?.contactList)
 async function LogoutHandle(){
  const res=await axios.get("/v1/logout")
  if(res.status=200)
    navigate("/")
 }
  return (
<div className="md:w-[30%] bg-slate-800 text-white h-[100%] border-solid 
        border-[1px] border-gray-500 overflow-auto scroll-m-1">
        <div className="flex h-[100px]">
        <img src={logo} alt="LOGO!!" className="w-[150px] h-[150px] absolute top-[-15px] hidden md:block left-[-40px]"/>
        <h1 className="font-medium text-3xl pt-8 relative w-[100%] md:left-[40%]">ChatApp</h1>
        </div>
          <div>
            <ContactsList/>
          </div>
        <div className=" flex  pt-10 text-white">
        <div className="text-slate-400 pl-4">Direct me To messages</div>
        <Dm/>
        </div>
        <div className="p-4 text-slate-400">Channels</div>
        <div className="flex md:bg-black rounded-xl  bottom-0 w-[100%]">
          <div>
            <img src={`${user?.image}`} alt="logo" className="w-[60px] h-[60px] md:w-[140px] md:h-[80px] rounded-[100%] mr-3" />
          </div>
          <div className="h-10 md:pl-9 md:w-full w-10">{user?.firstName && user?.lastName?`${user?.firstName}-${user?.lastName}`:""}
            <div className="flex">

              <CiEdit className="size-8 sm:{invisible} hover:text-slate-400" onClick={()=>navigate("/profile")}/>
            <FiLogOut className="size-7 ml-9 sm:{invisible} hover:text-slate-400" onClick={LogoutHandle}/>
            </div>

          </div>
        </div>
    </div>  )
}

export default Contacts