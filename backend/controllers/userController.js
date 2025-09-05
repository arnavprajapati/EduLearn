import User from '../models/usersModel.js'

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        return res.status(200).json(user)
    } catch (err) {
        console.log("getCurrentUser error", err)
        return res.status(500).json({ message: `getCurrentUser Error: ${err.message}` })
    }   
}


export { getCurrentUser }