import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { FaPlusCircle } from 'react-icons/fa';

const Dashboard = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const { 
        name = "Teacher",
        photoUrl = "",
        description = "",
        totalEarnings = 0,
        totalStudents = 0,
        courses = []
    } = userData || {};

    const firstLetter = name ? name[0].toUpperCase() : '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
            <div className="container mx-auto max-w-6xl">

                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center relative">
                    <button
                        onClick={() => navigate(-1)} 
                        className="absolute top-4 left-4 text-gray-500 hover:text-black transition-colors duration-200 cursor-pointer"
                        title="Go back"
                    >
                        <IoArrowBack className="w-6 h-6 md:w-7 md:h-7" />
                    </button>

                    <div className="flex items-center space-x-4 flex-grow mb-4 md:mb-0 md:ml-8">
                        <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-indigo-400 flex items-center justify-center bg-gray-200 shadow-md">
                            {photoUrl ? (
                                <img src={photoUrl} alt="Profile" className="object-cover w-full h-full" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl font-bold text-gray-500">
                                    {firstLetter}
                                </div>
                            )}
                        </div>

                        <div className="ml-4">
                            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 flex items-center">
                                Welcome, {name}! 
                                <span className="ml-2 md:ml-3 text-3xl md:text-4xl animate-wave origin-bottom-right">👋</span>
                            </h1>
                            <p className="text-sm md:text-lg text-gray-600 mt-2 leading-relaxed">
                                {description || "Ready to inspire? Your dashboard is here to help you manage your courses and track your progress."}
                            </p>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => navigate('/courses')}
                        className="flex items-center px-4 py-2 md:px-6 md:py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-black transition-all duration-200 transform hover:scale-105 w-full md:w-auto mt-4 md:mt-0 cursor-pointer"
                    >
                        <FaPlusCircle className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                        Create Course
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-center md:space-x-4 lg:space-x-6">
                    <div className="flex-1 bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 mb-4 md:mb-0 hover:shadow-lg transition-shadow duration-200">
                        <h3 className="text-xl font-semibold text-gray-700">Total Courses</h3>
                        <p className="text-4xl font-bold text-gray-900 mt-3">
                            {courses.length}
                        </p>
                    </div>

                    <div className="flex-1 bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 mb-4 md:mb-0 hover:shadow-lg transition-shadow duration-200">
                        <h3 className="text-xl font-semibold text-gray-700">Students Enrolled</h3>
                        <p className="text-4xl font-bold text-gray-900 mt-3">
                            {totalStudents}
                        </p>
                    </div>

                    <div className="flex-1 bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-200">
                        <h3 className="text-xl font-semibold text-gray-700">Total Earnings</h3>
                        <p className="text-4xl font-bold text-green-700 mt-3">
                            ₹{totalEarnings.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;