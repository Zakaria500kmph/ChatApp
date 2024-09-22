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


export const userAction =userSlice.actions

export {userSlice}