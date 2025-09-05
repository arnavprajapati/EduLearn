import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { GiHamburgerMenu, GiSplitCross } from 'react-icons/gi';
import { IoMdPerson } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../store/slice/userSlice.js';
import axios from 'axios';
import { serverURL } from '../App.jsx';

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    const handleLogout = async () => {
        try {
            await axios.get(serverURL + '/api/auth/logout', { withCredentials: true });
            dispatch(setUserData(null));
            toast.success('Logout Successful');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    const NavLink = ({ to, text, icon: Icon, onClick }) => (
        <Link
            to={to}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            onClick={onClick}
        >
            {Icon && <Icon className="text-xl" />}
            <span className="font-semibold hidden md:block ml-2">{text}</span>
        </Link>
    );

    return (
        <nav className="fixed top-0 left-0 w-full h-[70px] flex items-center justify-between px-5 md:px-20 bg-white shadow-md z-50">
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold text-gray-800 tracking-wide" onClick={() => setShowMobileMenu(false)}>
                    NextLearn
                </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
                {userData ? (
                    <>
                        {userData.role === 'educator' && (
                            <NavLink to="/dashboard" text="Dashboard" icon={AiOutlineDashboard} />
                        )}
                        <Link
                            to="/profile"
                            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                        >
                            <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-200 flex items-center justify-center overflow-hidden">
                                {userData.photoUrl ? (
                                    <img src={userData.photoUrl} className="w-full h-full object-cover" alt="User" />
                                ) : (
                                    <span className="text-gray-800 text-lg font-bold">{userData?.name.slice(0, 1).toUpperCase()}</span>
                                )}
                            </div>
                            <span className="font-semibold hidden md:block ml-2">Profile</span>
                        </Link>
                        <button
                            className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
                            onClick={handleLogout}
                        >
                            <FiLogOut className="text-xl" />
                            <span className="font-semibold hidden md:block ml-2 cursor-pointer">Sign Out</span>
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" text="Sign In" icon={FiLogIn} />
                )}
            </div>

            <div className="lg:hidden">
                <GiHamburgerMenu className="w-7 h-7 fill-gray-800 cursor-pointer" onClick={() => setShowMobileMenu(true)} />
            </div>

            <div
                className={`fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center gap-8 z-50 transform transition-transform duration-500 ease-in-out ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <GiSplitCross
                    className="w-8 h-8 fill-gray-800 absolute top-5 right-5 cursor-pointer"
                    onClick={() => setShowMobileMenu(false)}
                />

                {userData ? (
                    <>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 rounded-full cursor-pointer border-2 border-gray-800 bg-gray-200 flex items-center justify-center overflow-hidden">
                                {userData.photoUrl ? (
                                    <img src={userData.photoUrl} className="w-full h-full object-cover" alt="User" />
                                ) : (
                                    <span className="text-gray-800 text-2xl">{userData?.name.slice(0, 1).toUpperCase()}</span>
                                )}
                            </div>
                            <span className="text-gray-800 text-xl font-semibold">{userData.name}</span>
                        </div>

                        {userData.role === 'educator' && (
                            <Link to="/dashboard" className="text-gray-800 text-xl font-semibold hover:text-indigo-600 transition-colors duration-200" onClick={() => setShowMobileMenu(false)}>Dashboard</Link>
                        )}
                        <Link to="/profile" className="text-gray-800 text-xl font-semibold hover:text-indigo-600 transition-colors duration-200" onClick={() => setShowMobileMenu(false)}>My Profile</Link>
                        <Link to="/enrolledcourses" className="text-gray-800 text-xl font-semibold hover:text-indigo-600 transition-colors duration-200" onClick={() => setShowMobileMenu(false)}>My Courses</Link>
                        <button
                            className="text-white text-xl font-semibold px-6 py-3 rounded-full border-2 border-red-600 bg-red-600 hover:bg-red-700 transition-colors duration-200"
                            onClick={() => {
                                handleLogout();
                                setShowMobileMenu(false);
                            }}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <IoMdPerson className="w-12 h-12 fill-gray-800 border-2 border-gray-800 rounded-full p-2" />
                        <Link to="/login" className="text-gray-800 text-xl font-semibold hover:text-indigo-600 transition-colors duration-200 cursor-pointer" onClick={() => setShowMobileMenu(false)}>Sign In</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;