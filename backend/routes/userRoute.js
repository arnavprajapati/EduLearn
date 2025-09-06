import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.get('/currentuser', isAuth, getCurrentUser)
router.post("/updateprofile", isAuth, upload.single("photoUrl"), updateProfile)


export default router