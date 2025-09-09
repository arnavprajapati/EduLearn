import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

import { setCreatorCourseData } from '../../store/slice/courseSlice.js';
import { serverURL } from '../../App.jsx';

const Courses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { creatorCourseData } = useSelector(state => state.course);

    useEffect(() => {
        const getCreatorData = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/course/creator-courses`, { withCredentials: true });
                dispatch(setCreatorCourseData(result.data));
            } catch (error) {
                console.error(error);
                toast.error(error.response.data.message);
            }
        };
        getCreatorData();
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-8">
            <div className="w-full max-w-6xl mx-auto flex flex-col h-[85vh]">

                <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                        title="Go back"
                    >
                        <IoArrowBack className="w-6 h-6" />
                    </button>
                    <h2 className="text-3xl font-bold text-gray-800 flex-1 text-center">My Courses</h2>
                    <button
                        onClick={() => navigate('/create-course')}
                        className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md shadow-sm hover:bg-gray-700 transition-colors"
                    >
                        Create New Course
                    </button>
                </div>

                {creatorCourseData?.length > 0 ? (
                    <div className="bg-white rounded-lg shadow-xl flex-1 overflow-hidden flex flex-col">
                        <div className="overflow-y-auto">
                            <table className="w-full table-auto">
                                <thead className="sticky top-0 bg-gray-200 text-gray-700 text-left shadow-md z-10">
                                    <tr>
                                        <th className="py-4 px-6 font-semibold">Image</th>
                                        <th className="py-4 px-6 font-semibold">Title</th>
                                        <th className="py-4 px-6 font-semibold">Price</th>
                                        <th className="py-4 px-6 font-semibold">Status</th>
                                        <th className="py-4 px-6 font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creatorCourseData.map((course) => (
                                        <tr key={course._id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                                                    {course?.thumbnail ? (
                                                        <img src={course?.thumbnail} alt={course.title} className="object-cover w-full h-full" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            N/A
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-900 font-medium">
                                                {course.title}
                                                <p className="text-sm text-gray-500 mt-1">{course.category}</p>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600 font-semibold">
                                                ₹ {course.price ? `${course.price.toFixed(2)}` : "N/A"}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {course.isPublished ? "Published" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button
                                                    onClick={() => navigate(`/edit-course/${course._id}`)}
                                                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                                                    title="Edit Course"
                                                >
                                                    <FaEdit className="w-5 h-5 cursor-pointer" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
                        <p className="text-xl">You haven't created any courses yet.</p>
                        <button
                            onClick={() => navigate('/create-course')}
                            className="mt-4 px-6 py-3 text-lg font-semibold text-white bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition-colors"
                        >
                            Create Your First Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;