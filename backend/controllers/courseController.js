import Course from "../models/lectureModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
const createCourse = async (req, res) => {
    try{
        const { title, category } = req.body
        if(!title || !category){
            return res.status(400).json({ message: "title and category is required" })
        }
        const course = await Course.create({
            title,
            category,
            creator: req.user
        })
        return res.status(201).json(course)
    }catch(err){
        return res.status(500).json({ message: `Failed to create course ${err}` })
    }
}

const getPublishedCourses = async (req, res) => {
    try{
        const courses = await Course.find({
            isPublished: true
        })
        if(!courses){
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json(courses)
    }catch(error) {
        return res.status(500).json({
            message: `Failed to get All  courses ${error}`
        })
    }
}

const getCreatorCourses = async (req, res) => {
    try{
        const userId = req.user
        const courses = await Course.find({
            creator: userId
        })
        if(!courses){
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json(courses)
    }catch(error) {
        return res.status(500).json({
            message: `Failed to get creator courses ${error}`
        })
    }
}

const editCourse = async (req, res) => {
    try{
        const { courseId } = req.params;
        const { title, subTitle, description, subDescription, category, level, price, isPublished } = req.body;
        let thumbnail
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({ message: "Course not found" })
        }
        const updateData = { title, subTitle, description, subDescription, category, level, price, isPublished, thumbnail }
        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true })
        return res.status(201).json(course)
    }catch(error) {
        return res.status(500).json({ message: `Failed to update course ${error}` })
    }
} 

const getCourseById = async (req, res) => {
    try{
        const { courseId } = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json(course)
    }catch(error) {
        return res.status(500).json({ message: `Failed to get course ${error}` })
    }
}

const removeCourse = async (req, res) => {
    try{
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({ message: "Course not found" })
        }
        await course.deleteOne();
        return res.status(200).json({ message: "Course Removed Successfully" });
    }catch(error) {
        console.error(error);
        return res.status(500).json({ message: `Failed to remove course ${error}` })
    }
}

export { createCourse, getPublishedCourses, getCreatorCourses, editCourse, getCourseById, removeCourse }