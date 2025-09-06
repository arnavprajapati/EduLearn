import express from 'express'
import { createCourse, getPublishedCourses, getCreatorCourses, editCourse, getCourseById, removeCourse } from '../controllers/courseController.js'
import isAuth from '../middleware/isAuth.js'    

const router = express.Router()

router.post('/create-course', isAuth, createCourse)
router.get('/published-courses', getPublishedCourses)
router.get('/creator-courses', isAuth, getCreatorCourses)
router.put('/edit-course/:courseId', isAuth, editCourse)
router.get('/course/:courseId', isAuth, getCourseById)
router.delete('/remove-course/:courseId', isAuth, removeCourse)

export default router