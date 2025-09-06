import User from '../models/usersModel.js'
import uploadOnCloudinary from '../config/cloudinary.js'

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password")
        if (!user) {
            return res.status(400).json({ message: "user does not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "get current user error" })
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user
        const { name, description } = req.body
        let photoUrl
        if (req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path)
        }
        const user = await User.findByIdAndUpdate(userId, { name, description, photoUrl })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Update Profile Error  ${error}` })
    }
}

export { getCurrentUser, updateProfile }