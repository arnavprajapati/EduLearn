import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../store/slice/userSlice.js' 

export const getCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchResult = async () => {
            try {
                const result = await axios.get(serverURL + "/api/user/currentuser", { withCredentials: true });
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null));
            }
        }
        fetchResult()
    }, [])
}