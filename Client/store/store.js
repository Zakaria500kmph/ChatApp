import {configureStore} from "@reduxjs/toolkit"
import { contactSlice, userSlice } from "./slices"
const store=configureStore({
    reducer:{
        userInfo:userSlice.reducer,
        contactsInfo:contactSlice.reducer
    }
})
export default store