import jwt from 'jsonwebtoken'

const generateAuthToken = (userId) => {
    if (!process.env.JWT_TOKEN) {
        throw new Error("JWT_TOKEN is not defined in environment variables")
    }
    try {
        const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
            expiresIn: '1d'
        })
        return token
    } catch (err) {
        console.error("Token generation error:", err.message)
        throw new Error("Failed to generate token")
    }
}

export default generateAuthToken