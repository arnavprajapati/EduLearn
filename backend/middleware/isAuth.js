import jwt from 'jsonwebtoken'

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        let verifyToken = jwt.verify(token, process.env.JWT_TOKEN)
        if (!verifyToken) {
            return res.status(400).json({ message: "user doesn't have valid token" })
        }
        req.user = verifyToken.userId
        next()
    } catch (err) {
        console.log("isAuth error", err)
        return res.status(500).json({ message: `isAuth Error: ${err.message}` })
    }
}
export default isAuth