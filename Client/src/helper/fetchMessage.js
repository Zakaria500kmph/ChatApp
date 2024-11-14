import axios from "axios"
async function FetchMessage(contact){
   const options={contact}
   const config={
    headers:{
      "Content-Type":"application/json"
    },
    withCredentials:true
  }
   const Messages= await axios.post("/contacts/GetMessageData",options,config)
   return Messages
}
async function GetAllContacts(id){
  let config={
    withCredentials:true,
    headers:{
      "Content-Type":"application/json"
    }
  }
  const allMessages=await axios.get("/contacts/GetAllContacts",config)
}
export default FetchMessage
export {GetAllContacts}