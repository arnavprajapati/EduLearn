import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { serverURL } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/slice/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRole = (type) => {
        setFormData((prev) => ({ ...prev, role: type }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setLoading(true);
        try {
            const result = await axios.post(serverURL + "/api/auth/signup", formData, {
                withCredentials: true
            });
            dispatch(setUserData(result.data));
            console.log(result.data);
            navigate("/");
            setLoading(false);
            toast.success("SignUp Successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await signInWithPopup(auth, provider)

            const user = response.user
            const name = user.displayName;
            const email = user.email
            const role = formData.role
            const result = await axios.post(serverURL + "/api/auth/google-signup", { name, email, role }
                , { withCredentials: true }
            )
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("SignUp Successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Let's Get Started</h1>
                    <p className="text-gray-500 mt-2">Create your account</p>
                </div>

                <div className="flex justify-center mb-6">
                    <button
                        type="button"
                        onClick={() => handleRole("student")}
                        className={`px-6 py-2 rounded-l-full border transition ${formData.role === "student"
                            ? "bg-black text-white border-black"
                            : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                            }`}
                    >
                        Student
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRole("educator")}
                        className={`px-6 py-2 rounded-r-full border transition ${formData.role === "educator"
                            ? "bg-black text-white border-black"
                            : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                            } border-l-0`}
                    >
                        Educator
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="text-right text-sm">
                        <Link to="/forgot-password" className="text-gray-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        {loading ? <ClipLoader size={30} color='white' /> : "Sign Up"}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition" onClick={handleGoogleLogin}>
                    <FaGoogle className="text-red-500" />
                    <span>Sign up with Google</span>
                </button>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?
                    <Link to="/login" className="text-black ml-1 font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;