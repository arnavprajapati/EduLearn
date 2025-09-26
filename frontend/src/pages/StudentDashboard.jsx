import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { MdOutlineSchool } from 'react-icons/md';
import { FaPlusCircle } from 'react-icons/fa';

const StudentDashboard = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const { 
        name = "User",
        photoUrl = "",
        enrolledCourses = [],
    } = userData || {};

    const enrolledCount = enrolledCourses.length;

    const firstLetter = name ? name[0].toUpperCase() : '';

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="container mx-auto max-w-6xl">

                <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 mb-10 flex flex-col md:flex-row items-start md:items-center relative border-t-4 border-black">
                    <button
                        onClick={() => navigate('/')} 
                        className="absolute top-4 left-4 text-gray-600 hover:text-black cursor-pointer p-2 rounded-full hover:bg-gray-200"
                        title="Go back to Home"
                    >
                        <IoArrowBack className="w-6 h-6 md:w-7 md:h-7" />
                    </button>

                    <div className="flex items-center space-x-6 flex-grow mb-4 md:mb-0 md:ml-10">
                        {/* Profile Picture / Initial */}
                        <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-gray-500 flex items-center justify-center bg-gray-200 shadow-lg">
                            {photoUrl ? (
                                <img src={photoUrl} alt="Profile" className="object-cover w-full h-full" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl font-extrabold text-gray-600">
                                    {firstLetter}
                                </div>
                            )}
                        </div>

                        <div className="ml-4">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center">
                                Welcome back to your Learning Hub! 
                                <span className="ml-2 md:ml-3 text-3xl md:text-4xl">👋</span>
                            </h1>
                            <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-1">
                                {name}
                            </p>
                            <p className="text-sm md:text-lg text-gray-600 mt-2 leading-relaxed">
                                Apni learning journey continue karein aur enrolled courses ki progress track karein.
                            </p>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => navigate('/my-courses')}
                        className="flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 w-full md:w-auto mt-4 md:mt-0 cursor-pointer"
                    >
                        <FaPlusCircle className="w-5 h-5 mr-2" />
                        View My Courses
                    </button>
                </div>

                <div className="flex justify-center mb-10">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center border-t-4 border-gray-600">
                        <MdOutlineSchool className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                        <h2 className="text-xl font-semibold text-gray-700">Courses Enrolled</h2>
                        <p className="text-5xl font-extrabold text-gray-800 mt-2">
                            {enrolledCount}
                        </p>
                        <p className="text-gray-600 mt-2">
                            Shaandar kaam! Learning material access karne ke liye niche click karein.
                        </p>
                        <button
                            onClick={() => navigate('/my-courses')} 
                            className="mt-5 px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800"
                        >
                            Go to My Courses
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentDashboard;