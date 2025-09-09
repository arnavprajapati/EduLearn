import Course from "../models/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import Lecture from "../models/lectureModel.js";

// create course
const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body
        if (!title || !category) {
            return res.status(400).json({ message: "title and category is required" })
        }
        const course = await Course.create({
            title,
            category,
            creator: req.user
        }).populate("creator", "name email photoUrl role")
        return res.status(201).json(course)
    } catch (err) {
        return res.status(500).json({ message: `Failed to create course ${err}` })
    }
}

const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            isPublished: true
        }).populate("creator", "name email photoUrl role")
        if (!courses) {
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({
            message: `Failed to get All  courses ${error}`
        })
    }
}

const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.user
        const courses = await Course.find({
            creator: userId
        })
        if (!courses) {
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({
            message: `Failed to get creator courses ${error}`
        })
    }
}

const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, subTitle, description, subDescription, category, level, price, isPublished } = req.body;
        let thumbnail
        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        const updateData = { title, subTitle, description, subDescription, category, level, price, isPublished, thumbnail }
        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true })
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({ message: `Failed to update course ${error}` })
    }
}

const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({ message: `Failed to get course ${error}` })
    }
}

const removeCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        await course.deleteOne();
        return res.status(200).json({ message: "Course Removed Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Failed to remove course ${error}` })
    }
}

// create lectures

const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body
        const { courseId } = req.params
        if (!lectureTitle || !courseId) {
            return res.status(400).json({ message: "Lecture Title required" })
        }
        const lecture = await Lecture.create({ lectureTitle })
        const course = await Course.findById(courseId)
        if (course) {
            course.lectures.push(lecture._id)
        }
        await course.populate("lectures")
        await course.save()
        return res.status(201).json({
            lecture,
            course
        })
    } catch (error) {
        return res.status(500).json({ message: `Failed to Create Lecture ${error}` })
    }
}

const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({ message: `Failed to Fetch Lecture ${error}` })
    }
}

const editLecture = async (req, res) => {
    try {
        const { lectureId } = req.params
        const { isPreviewFree, lectureTitle } = req.body
        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" })
        }
        let videoUrl
        if (req.file) {
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree

        await lecture.save()
        return res.status(200).json(lecture)
    } catch (error) {
        return res.status(500).json({ message: `Failed to edit Lectures ${error}` })
    }

}

const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" })
        }

        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        )
        return res.status(200).json({ message: "Lecture Remove Successfully" })
    }

    catch (error) {
        return res.status(500).json({ message: `Failed to remove Lectures ${error}` })
    }
}

const getSingleLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }
        res.status(200).json(lecture);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//get Creator data
const getCreatorById = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "get Creator error" });
    }
};


export { createCourse, getPublishedCourses, getCreatorCourses, editCourse, getCourseById, removeCourse, createLecture, getCourseLecture, editLecture, removeLecture, getCreatorById, getSingleLecture}