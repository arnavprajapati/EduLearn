import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router

router.get('/currentuser', isAuth, getCurrentUser)

export default router