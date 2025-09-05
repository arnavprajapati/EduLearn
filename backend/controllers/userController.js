import User from '../models/usersModel.js'

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


export { getCurrentUser }