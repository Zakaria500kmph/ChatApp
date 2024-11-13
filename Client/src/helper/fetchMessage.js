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
export default FetchMessage