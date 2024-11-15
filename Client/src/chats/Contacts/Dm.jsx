import { useState } from "react"
import Lottie from "react-lottie"
import { animationDefaultOptions } from "../../Utils/ProfileHandler"
import axios from "axios"
import DetailCard from "./DetailCard"
import { useDispatch } from "react-redux"
import { contactsAction} from "../../../store/slices"

function Dm() {
     const [set,Setset]=useState(false)
    const [searchContacts,setSearchContacts]=useState("")
    let [contactDet,setContactDet]=useState([])
    const dispatch=useDispatch()
    function HandleContacts(){
      Setset(true)  
      dispatch(contactsAction.setChatType("Chat"))
            }
      async function Search(e){
        e.preventDefault()
        const RegExp=/^[a-zA-Z0-9]$/
        if(e.key=="Enter" || e.key==undefined){
          const options={searchContacts}
          const config={
            headers:{
              "Content-Type":"application/json"
            },
            withCredentials:true
          }
           const response=await axios.post("/contacts/Search",options,config)
         if(response.data){
          setContactDet(response.data)            
         }
        }
        else if(RegExp.test(e.key)){
          setSearchContacts(searchContacts.concat(e.key))
        }
        else if(e.key=="Backspace"){
          let search=searchContacts
          setSearchContacts(search.slice(0,search.length-1))
        }
        
    }
  return (<>
    <div className="pl-14 text-3xl mt-[-7px] cursor-pointer relative group">
  <div className="absolute hidden group-hover:block text-white text-center p-2 mt-[-30px] ml-[-40px] rounded text-sm w-[100px] bg-slate-800" >
    Add Contact
  </div>
  <div onClick={HandleContacts}>+</div>
</div>
{set && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
  <div className="bg-slate-800 p-8 rounded-lg shadow-lg min-w-[300px] max-h-[60%] overflow-y-auto">
    <h2 className="text-2xl mb-4 text-white text-center">Add contacts</h2>
    <div className="flex">
    <input className="mb-4 text-white block bg-slate-600 p-2 rounded-2xl min-w-[400px]" value={searchContacts} placeholder="Enter Contacts" onKeyDown={Search} onSubmit={Search}></input>
    <button className="mb-5 ml-6 hover:bg-purple-600 min-w-[80px] rounded-2xl" onClick={Search}>Search</button>
    </div>
    {searchContacts.length===0 && <div>
      
      <div className="bg-slate-800 w-full 
        md:flex
        duration-1000 transition-all hidde justify-center items-center">
    <Lottie
    isClickToPauseDisabled={true}
    height={100}
    width={100}
    options={animationDefaultOptions}
    /> 
    <div className="text-white font-medium text-xl p-[40px] font-sans">
        Hi <span className="text-purple-600">!</span>Search your <span className="text-purple-600">Friends Here</span>
        </div>
    </div>
      </div>}
      { (contactDet.length>0 && searchContacts.length!=0) &&<DetailCard profile={contactDet} Set={Setset} onClick={()=>console.log("item clicked with id as")}/>}
    <button className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-red-600 mt-12" onClick={()=>Setset(!set)}>Close</button>
  </div>
</div>
}
</>
  )
}

export default Dm