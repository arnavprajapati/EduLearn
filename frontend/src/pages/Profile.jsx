import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const { 
        name = "User", 
        email = "N/A", 
        role = "student", 
        photoUrl = "", 
        description = "", 
        enrolledCourses = []
    } = userData || {};

    const firstLetter = name ? name[0].toUpperCase() : '';

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-8">
            <div className="flex flex-col mt-12 md:flex-row w-full max-w-4xl h-auto md:h-[600px] bg-white rounded-lg shadow-xl overflow-hidden">

                <div className="md:w-1/3 flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-600 flex items-center justify-center bg-gray-700 mb-4">
                        {photoUrl ? (
                            <img src={photoUrl} alt="Profile" className="object-cover object-center w-full h-full" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-8xl bg-gray-600">
                                {firstLetter}
                            </div>
                        )}
                    </div>
                    <h2 className="text-3xl text-center leading-tight">{name}</h2>
                </div>
                
                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                    <h3 className="text-3xl text-gray-800 mb-6 border-b pb-2">Profile Information</h3>
                    
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Email Address</p>
                            <p className="text-base text-gray-900">{email}</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Role</p>
                            <p className="text-base text-gray-900">{role}</p>
                        </div>
                        
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Enrolled Courses</p>
                            <p className="text-base text-gray-900">
                                {enrolledCourses.length} {enrolledCourses.length === 1 ? 'Course' : 'Courses'}
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Description</p>
                            <div className="p-4 bg-gray-100 rounded-md">
                                <p className="text-base text-gray-700 leading-snug">
                                    {description || "No description has been added yet. Click the edit button to add one."}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-8 mt-auto border-t border-gray-200">
                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="w-full px-6 py-3 text-lg text-white bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;