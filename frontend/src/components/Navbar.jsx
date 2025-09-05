import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-20">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <span className="text-lg md:text-xl font-bold text-gray-800">NextLearn</span>
                    </Link>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6">
                    <Link
                        to="/dashboard"
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    >
                        <AiOutlineDashboard className="text-xl" />
                        <span className="font-semibold hidden md:block ml-2">Dashboard</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    >
                        <FaRegUserCircle className="text-xl" />
                        <span className="font-semibold hidden md:block ml-2">Profile</span>
                    </Link>
                    <button
                        className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                        <FiLogOut className="text-xl" />
                        <span className="font-semibold hidden md:block ml-2">Sign Out</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;