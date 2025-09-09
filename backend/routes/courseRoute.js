import express from 'express'
import { createCourse, getPublishedCourses, getCreatorCourses, editCourse, getCourseById, removeCourse, createLecture, getCourseLecture, editLecture, removeLecture, getCreatorById, getSingleLecture } from '../controllers/courseController.js'
import isAuth from '../middleware/isAuth.js' 
import upload from "../middleware/multer.js";

const router = express.Router()

router.post('/create-course', isAuth, createCourse)
router.get('/published-courses', getPublishedCourses)
router.get('/creator-courses', isAuth, getCreatorCourses)
router.put('/edit-course/:courseId', isAuth, upload.single("thumbnail"), editCourse)
router.get('/get-course/:courseId', isAuth, getCourseById)
router.delete('/remove-course/:courseId', isAuth, removeCourse)

router.post('/create-lecture/:courseId', isAuth, createLecture)
router.get('/get-course-lectures/:courseId', isAuth, getCourseLecture)
router.post('/edit-lecture/:lectureId', isAuth, upload.single("videoURL"), editLecture)
router.delete('/remove-lecture/:lectureId', isAuth, removeLecture)

router.get("/lecture/:lectureId", isAuth, getSingleLecture)

router.post("/get-creator",isAuth, getCreatorById)

export default router