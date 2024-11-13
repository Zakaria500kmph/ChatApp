import express from "express"
import { Search,GetMessages,GetAllContacts } from "../controller/contacts.controller.js"
import auth from "../utils/auth.middleware.js"
const Contacts_router=express.Router()

Contacts_router.route("/Search").post(auth,Search)
Contacts_router.route("/GetMessageData").post(auth,GetMessages)
Contacts_router.route("/GetAllContacts").get(auth,GetAllContacts)


export default Contacts_router