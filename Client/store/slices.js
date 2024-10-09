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
    initialState:{contacts:undefined,contactsType:undefined,setup:false,chatType:undefined},
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
        }

    }
})

export const userAction =userSlice.actions
const contactsAction=contactSlice.actions

export {userSlice,contactsAction,contactSlice}