import React, { useEffect } from 'react'
import { serverURL } from '../App.jsx'
import axios from 'axios'
import { setCreatorCourseData } from '../store/slice/courseSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const getCreatorCourseData = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    return (
        useEffect(() => {
            const getCreatorData = async () => {
                try {
                    const result = await axios.get(`${serverURL}/api/course/creator-courses`, { withCredentials: true })
                    await dispatch(setCreatorCourseData(result.data))
                    console.log("course data: ", result.data)

                } catch (error) {
                    console.log(error)
                    toast.error(error.response.data.message)
                }

            }
            getCreatorData()
        }, [userData])
    )
}

export default getCreatorCourseData