import generateAuthToken from '../config/token.js'
import User from '../models/usersModel.js'
import bcrypt from 'bcrypt'

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
            secure: false,
            sameSite: "Strict",
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
            secure: false,
            sameSite: "Strict",
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
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        })
        return res.status(200).json({ message: "Logout Successfully" })
    } catch (err) {
        return res.status(500).json({ message: `logout Error: ${err.message}` })
    }
}

export { signUp, login, logout }
