import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import store from '../store/store.js'
import Browser from './Utils/Browser.jsx'
import  Profile  from './Utils/Profile.jsx'
import { Provider } from 'react-redux'
import Login from './Utils/login.jsx'
import Intermediate from './Utils/Intermediate.jsx'
import { SocketProvider } from './context/contextSocket.jsx'
const router=createBrowserRouter([
  {path:"/",
   element:<SocketProvider><App/></SocketProvider>,
   children:
    [{path:"/",element:<Login/>},
    {path:"/browser",element:<Browser/>},
    {path:"/profile",element:<Profile/>},
    {path:"/intermediate",element:<Intermediate/>}]
    }
  
])
const Store=store
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
);
