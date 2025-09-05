import express from 'express'
import { login, logout, signUp, sendOTP, verifyOTP, resetPassword } from '../controllers/authController.js'

const router = express.Router() 
router.post('/signup', signUp)
router.post('/login', login)
router.get('/logout', logout)
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)
router.post('/reset-password', resetPassword)

export default router