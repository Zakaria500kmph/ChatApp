import express from "express"
import { Search } from "../controller/contacts.controller.js"
import auth from "../utils/auth.middleware.js"
const Contacts_router=express.Router()

Contacts_router.route("/Search").post(auth,Search)

export default Contacts_router