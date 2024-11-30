import express from "express"
import { Search,GetMessages,GetAllContacts,uploadFiles } from "../controller/contacts.controller.js"
import auth from "../utils/auth.middleware.js"
import multer from "multer"
import path from "path"
const Contacts_router=express.Router()
const __dirname = path.resolve();
const upload = multer({
  dest: path.join(__dirname, "upload/files/"), // Absolute path
});

Contacts_router.route("/Search").post(auth,Search)
Contacts_router.route("/GetMessageData").post(auth,GetMessages)
Contacts_router.route("/GetAllContacts").get(auth,GetAllContacts)
Contacts_router.route("/File").post( auth,upload.single('file'),uploadFiles)



export default Contacts_router