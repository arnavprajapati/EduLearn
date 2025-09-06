import axios from 'axios';
import { serverURL } from '../App.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../store/slice/courseSlice.js';
import { useEffect } from 'react';
import React from 'react'

const getCourseData = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        const getAllPublishedCourse = async () => {
            try {
                const result = await axios.get(serverURL + "/api/course/published-courses", { withCredentials: true })
                console.log(result.data)
                dispatch(setCourseData(result.data))

            } catch (error) {
                console.log(error)
            }
        }
        getAllPublishedCourse()
    }, [])

}

export default getCourseData