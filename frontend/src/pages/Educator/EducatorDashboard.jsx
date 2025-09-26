import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { FaPlusCircle, FaGraduationCap } from 'react-icons/fa';

const StatCard = ({ title, value, colorClass, prefix = '' }) => (
    <div className="flex-1 bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <p className="text-4xl font-bold text-gray-900 mt-3">
            {prefix}{value.toLocaleString()}
        </p>
    </div>
);

const EducatorDashboard = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const {
        name = "Creator",
        photoUrl = "",
        totalEarnings = 0,
        totalStudents = 0,
        courses = [],
    } = userData || {};

    const hasStats = (courses.length > 0 || totalStudents > 0 || totalEarnings > 0);
    const isStatsEmpty = !hasStats;

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
                                Welcome to your Creator Studio!
                                <span className="ml-2 md:ml-3 text-3xl md:text-4xl">👋</span>
                            </h1>
                            <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-1">
                                {name}
                            </p>
                            <p className="text-sm md:text-lg text-gray-600 mt-2 leading-relaxed">
                                Apne courses manage karein aur revenue performance dekhein.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 w-full md:w-auto'>
                        <button
                            onClick={() => navigate('/courses')}
                            className="flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 w-full md:w-auto mt-4 md:mt-0 cursor-pointer"
                        >
                            <FaPlusCircle className="w-5 h-5 mr-2" />
                            Create New Course
                        </button>
                        <button
                            onClick={() => navigate('/my-courses')}
                            className="flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 w-full md:w-auto mt-4 md:mt-0 cursor-pointer"
                        >
                            <FaPlusCircle className="w-5 h-5 mr-2" />
                            Your Enrolled Course
                        </button>
                    </div>
                </div>

                {!isStatsEmpty && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">

                        <StatCard
                            title="Total Courses"
                            value={courses.length}
                        />
                        <StatCard
                            title="Students Enrolled"
                            value={totalStudents}
                        />
                        <StatCard
                            title="Total Earnings"
                            value={totalEarnings}
                            prefix="₹"
                        />
                    </div>
                )}

                {isStatsEmpty && (
                    <div className="bg-white p-8 rounded-xl shadow-xl text-center border-t-4 border-black">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                            <FaGraduationCap className="w-7 h-7 mr-3 text-gray-700" />
                            Abhi koi course publish nahi hua!
                        </h2>
                        <p className="text-gray-700 mt-3 text-lg">
                            Aapka dashboard stats zero hai kyunki aapne abhi tak koi paid course create ya publish nahi kiya hai.
                        </p>
                        <button
                            onClick={() => navigate('/courses/create')}
                            className="mt-5 flex items-center justify-center mx-auto px-8 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800"
                        >
                            <FaPlusCircle className="w-5 h-5 mr-2" />
                            Start Creating Your First Course Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EducatorDashboard;