import {configureStore} from "@reduxjs/toolkit"
import { contactSlice, userSlice ,uploadSlice} from "./slices"
const store=configureStore({
    reducer:{
        userInfo:userSlice.reducer,
        contactsInfo:contactSlice.reducer,
        uploads:uploadSlice.reducer
    }
})
export default store