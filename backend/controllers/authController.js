import generateAuthToken from '../config/token.js'
import User from '../models/usersModel.js'
import bcrypt from 'bcrypt'
import sendMail from '../config/sendMail.js'

const signUp = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        let user = await User.create({ name, email, password: hashPassword, role })

        const token = await generateAuthToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        user = user.toObject()
        delete user.password

        return res.status(201).json(user)
    } catch (err) {
        console.log("signUp error", err)
        return res.status(500).json({ message: `signUp Error: ${err.message}` })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        const token = await generateAuthToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        user = user.toObject()
        delete user.password

        return res.status(200).json(user)
    } catch (err) {
        console.log("login error", err)
        return res.status(500).json({ message: `login Error: ${err.message}` })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        })
        return res.status(200).json({ message: "Logout Successfully" })
    } catch (err) {
        return res.status(500).json({ message: `logout Error: ${err.message}` })
    }
}


const sendOTP = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerifed = false
        await user.save()
        await sendMail(email, otp)
        return res.status(200).json({ message: "OTP sent to your email" })
    } catch (err) {
        console.log("sendOTP error", err)
        return res.status(500).json({ message: `sendOTP Error: ${err.message}` })
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
        user.isOtpVerifed = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({ message: "OTP varified " })
    } catch (err) {
        console.log("verifyOTP error", err)
        return res.status(500).json({ message: `verifyOTP Error: ${err.message}` })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body
        if (!newPassword) {
            return res.status(400).json({ message: "Password is required" })
        }

        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerifed) {
            return res.status(404).json({ message: "OTP verification required" })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashPassword
        user.isOtpVerifed = false
        await user.save()
        return res.status(200).json({ message: "Password Reset Successfully" })
    } catch (error) {
        console.log("resetPassword error", error)
        return res.status(500).json({ message: `Reset Password error: ${error.message}` })
    }
}

const googleSignup = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                role: role || "student",
            });
        }

        const token = await generateAuthToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `googleSignup error: ${error.message}` });
    }
};



export { signUp, login, logout, sendOTP, verifyOTP, resetPassword, googleSignup }
