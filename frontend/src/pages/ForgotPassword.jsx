import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { serverURL } from '../App.jsx';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${serverURL}/api/auth/send-otp`, { email: formData.email });
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${serverURL}/api/auth/verify-otp`, { email: formData.email, otp: formData.otp });
            toast.success("OTP verified successfully!");
            setStep(3);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${serverURL}/api/auth/reset-password`, {
                email: formData.email,
                newPassword: formData.newPassword,
                otp: formData.otp,
            });
            toast.success("Password reset successfully!");
            navigate("/login"); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Forgot Password</h1>
                    <p className="text-gray-500 mt-2">
                        {step === 1 && "Enter your email to receive a password reset code."}
                        {step === 2 && "Enter the OTP you received in your email."}
                        {step === 3 && "Set your new password."}
                    </p>
                </div>

                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your Email Address"
                                required
                                className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={24} color='white' /> : "Send OTP"}
                        </button>
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-gray-600 hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="Enter OTP"
                                required
                                className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={24} color='white' /> : "Verify OTP"}
                        </button>
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-gray-600 hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="relative">
                            <div
                                className="absolute left-3 top-3.5 text-gray-400 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="New Password"
                                required
                                className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div className="relative">
                            <div
                                className="absolute left-3 top-3.5 text-gray-400 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm New Password"
                                required
                                className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={24} color='white' /> : "Reset Password"}
                        </button>
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-gray-600 hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
