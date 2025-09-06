import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { serverURL } from '../../App.jsx';

const categories = [
    { name: 'Web Dev', icon: '💻' },
    { name: 'UI/UX Designing', icon: '🎨' },
    { name: 'App Dev', icon: '📱' },
    { name: 'Ethical Hacking', icon: '🛡️' },
    { name: 'AI/ML', icon: '🤖' },
    { name: 'Data Science', icon: '📊' },
    { name: 'Data Analytics', icon: '📈' },
    { name: 'AI Tools', icon: '⚙️' },
];

const CreateCourse = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const CreateCourseHandler = async () => {
        setLoading(true);
        try {
            const result = await axios.post(
                `${serverURL}/api/course/create-course`, 
                { title, category }, 
                { withCredentials: true }
            );
            console.log(result.data);
            toast.success("Course Created");
            navigate("/courses");
            setTitle("");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !category) {
            toast.error('Please enter a course name and select a category.');
            return;
        }
        CreateCourseHandler();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-8">
            <div className="w-full max-w-4xl mx-auto flex flex-col flex-1 bg-white rounded-lg shadow-xl p-8">
                <div className="flex items-center mb-6 cursor-pointer">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                        <IoArrowBack className="w-8 h-8" />
                    </button>
                    <h2 className="text-3xl font-bold text-gray-800 flex-1 text-center">Create a New Course</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                    <div className="mb-8">
                        <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-lg text-gray-800"
                            placeholder="e.g., The Complete Web Development Bootcamp"
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">
                            Select a Category
                        </label>
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((cat) => (
                                <div
                                    key={cat.name}
                                    onClick={() => setCategory(cat.name)}
                                    className={`
                                        flex flex-col items-center justify-center p-6 rounded-lg shadow-md transition-all cursor-pointer w-[150px]
                                        ${category === cat.name 
                                            ? 'bg-gray-700 text-white transform scale-105 ring-2 ring-gray-600' 
                                            : 'bg-white hover:bg-gray-100 text-gray-800'
                                        }
                                    `}
                                >
                                    <span className="text-4xl mb-2">{cat.icon}</span>
                                    <span className="text-sm font-medium text-center">{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto cursor-pointer">
                        <button
                            type="submit"
                            className="w-full py-4 px-6 bg-gray-800 text-white font-bold text-lg rounded-lg shadow-md hover:bg-gray-700 transition-colors flex justify-center items-center cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <ClipLoader color="#fff" size={24} />
                            ) : (
                                "Create Course"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;