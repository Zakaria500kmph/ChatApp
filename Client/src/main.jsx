import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import store from '../store/store.js'
import Browser from './Utils/Browser.jsx'
import  Profile  from './Utils/Profile.jsx'
import { Provider } from 'react-redux'
const router=createBrowserRouter([
  {path:"/",
   element:<App/>,
   children:[
   {
    path:"/browser",
    element:<Browser/>
   },
   {
    path:"/profile",
    element:<Profile/>
   }
   ]
   
  }
  
])
const Store=store
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={Store}>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
