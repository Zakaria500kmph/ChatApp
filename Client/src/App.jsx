import { useEffect, useState} from 'react'
import Login from './Utils/login.jsx'
import axios from 'axios'
import { userAction } from '../store/slices'
import {useDispatch, useSelector} from "react-redux"
import Browser from "./Utils/Browser.jsx"
import Profile from "./Utils/Profile.jsx"
import { Outlet } from 'react-router-dom'
function App() {
  return <>
  <Outlet/>
  </>
  
}

export default App
