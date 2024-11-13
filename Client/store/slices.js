import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name :"User",
    initialState:{user:undefined},
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }
})
const contactSlice=createSlice({
    name:"Contacts",
    initialState:{contacts:undefined,contactsType:undefined,setup:false,chatType:undefined,selectedChatMessages:[]},
    reducers:{
        setContacts:(state,action)=>{
            state.contacts=action.payload
        },
        setContactsType:(state,action)=>{
            state.contactsType=true
        },
        Setup(state,action){
            state.setup=!state.setup
        },
        setChatType(state,action){
            state.chatType=action.payload
        },
        setSelectedChatMessages(state,action){
            const previousMessages=state.selectedChatMessages
            state.selectedChatMessages=[...previousMessages,{ message:action.payload.content, receiver:`${state.chatType!=="text" ? action.payload.receiver._id:action.payload.receiver }` ,sender :`${state.chatType!=="text" ? action.payload.sender._id:action.payload.sender }` }]
            
        },
        setSelectedChatMessagesArray(state, action) {
            const newMessages = action.payload.map(item => ({
              message: item.content,
              receiver: item.receiver,
              sender: item.sender
            }));
            state.selectedChatMessages = newMessages
          }
          
          

    }
})

export const userAction =userSlice.actions
const contactsAction=contactSlice.actions

export {userSlice,contactsAction,contactSlice}