import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { MdOutlineSchool } from 'react-icons/md';
import { FaBookOpen } from 'react-icons/fa';

import EnrolledCourseCard from '../components/EnrolledCourseCard'; 

const MyCourses = () => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);

    const enrolledCourses = userData?.enrolledCourses || [];

    const hasEnrolledCourses = enrolledCourses.length > 0;
    
    const coursesToDisplay = enrolledCourses.map((course) => ({
        ...course,
        _id: course._id, 
        author: course.creator?.name, 
        category: course.category, 
        level: course.level, 
        image: course.thumbnail 
    }));


    return (
        <div className="min-h-screen mt-16 bg-gray-50 p-6 md:p-10">
            <div className="container mx-auto max-w-7xl">

                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate('/dashboard')} 
                        className="text-gray-600 hover:text-black cursor-pointer p-2 rounded-full hover:bg-gray-200"
                        title="Go back to Dashboard"
                    >
                        <IoArrowBack className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 ml-4">
                        My Enrolled Courses 
                    </h1>
                </div>
                
                <hr className="mb-10 border-gray-300" />

                {hasEnrolledCourses ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {coursesToDisplay.map((course, index) => {
                            return (
                                <EnrolledCourseCard 
                                    key={course._id}
                                    id={course._id}
                                    title={course.title}
                                    image={course.image}
                                    category={course.category}
                                    author={course.author}
                                    level={course.level}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-xl shadow-xl text-center border-t-4 border-black max-w-lg mx-auto mt-20">
                        <MdOutlineSchool className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Ready to start learning?
                        </h2>
                        <p className="text-gray-700 mt-3 text-lg">
                            Aapne abhi tak koi course enroll nahi kiya hai. Apni journey shuru karne ke liye naye courses dekhein.
                        </p>
                        <button
                            onClick={() => navigate('/all-courses')}
                            className="mt-6 flex items-center justify-center mx-auto px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800"
                        >
                            <FaBookOpen className="w-4 h-4 mr-2" />
                            Explore Courses Now
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyCourses;