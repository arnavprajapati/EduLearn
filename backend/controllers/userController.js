import User from '../models/usersModel.js'
import Course from '../models/courseModel.js'
import uploadOnCloudinary from '../config/cloudinary.js'

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user;

        let userQuery = User.findById(userId).select("-password");

        userQuery = userQuery.populate({
            path: 'enrolledCourses',
            select: 'title price thumbnail creator level category',
            populate: {
                path: 'creator',
                select: 'name photoUrl',
            }
        });

        let userData = await userQuery.lean();

        if (!userData) {
            return res.status(400).json({ message: "User does not found" });
        }

        if (userData.role === 'educator') {
            const educatorCourses = await Course.find({ creator: userId }).lean();

            let totalStudents = 0;
            let totalEarnings = 0;

            for (const course of educatorCourses) {
                const courseStudents = course.enrolledStudents.length;
                totalStudents += courseStudents;

                if (course.price) {
                    totalEarnings += course.price * courseStudents;
                }
            }

            userData.totalCourses = educatorCourses.length;
            userData.totalStudents = totalStudents;
            userData.totalEarnings = totalEarnings;
            userData.courses = educatorCourses;
        }

        return res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get current user data with stats" });
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