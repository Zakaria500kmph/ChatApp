import express from "express"
import { LoginUser,RegisterUser,userInfo,SetupProfile,updateDp,logout } from "../controller/user.controller.js"
import auth from "../utils/auth.middleware.js"

import multer from "multer"

const upload=multer({dest:"upload/profile/"})

let router=express.Router()
router.route("/login").post(LoginUser)
router.route("/reg").post(RegisterUser)
router.route("/userInfo").get(userInfo)
router.route("/SetupProfile").patch(auth,SetupProfile)
router.route("/updateDp").post(upload.single("profileImage"),auth,updateDp)
router.route("/logout").get(auth,logout)


export default router