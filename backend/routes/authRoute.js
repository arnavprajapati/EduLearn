import express from 'express'
import { login, logout, signUp, sendOTP, verifyOTP, resetPassword, googleSignup } from '../controllers/authController.js'

const router = express.Router() 
router.post('/signup', signUp)
router.post('/login', login)
router.get('/logout', logout)
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)
router.post('/reset-password', resetPassword)
router.post('/google-signup', googleSignup)

export default router