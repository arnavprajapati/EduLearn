import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCourseData } from '../../store/slice/courseSlice.js';
import { serverURL } from '../../App.jsx';

function EditCourse() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subDescription, setSubDescription] = useState('');
    const [level, setLevel] = useState('');
    const [price, setPrice] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    const getCourseById = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/course/get-course/${courseId}`, { withCredentials: true });
            setSelectedCourse(result.data);
        } catch (error) {
            console.error('Error fetching course:', error);
            toast.error('Failed to fetch course data.');
        }
    };

    useEffect(() => {
        getCourseById();
    }, [courseId]);

    useEffect(() => {
        if (selectedCourse) {
            setTitle(selectedCourse.title ? selectedCourse.title.trim() : '');
            setSubTitle(selectedCourse.subTitle || '');
            setDescription(selectedCourse.description || '');

            if (selectedCourse.category === "Web Dev") {
                setCategory("Web Development");
            } else {
                setCategory(selectedCourse.category || '');
            }

            setSubDescription(selectedCourse.subDescription || '');
            setLevel(selectedCourse.level || '');
            setPrice(selectedCourse.price || '');
            setFrontendImage(selectedCourse.thumbnail || 'https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg');
            setIsPublished(selectedCourse?.isPublished);
        }
    }, [selectedCourse]);

    const handleThumbnail = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

    const editCourseHandler = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subTitle', subTitle);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('subDescription', subDescription);
        formData.append('level', level);
        formData.append('price', price);
        if (backendImage) {
            formData.append('thumbnail', backendImage);
        } else {
            formData.append('thumbnail', null);
        }
        formData.append('isPublished', isPublished);

        try {
            const result = await axios.put(
                `${serverURL}/api/course/edit-course/${courseId}`,
                formData,
                { withCredentials: true }
            );

            const updatedCourse = result.data;
            let newCourseData;
            if (updatedCourse.isPublished) {
                newCourseData = courseData.map((c) => (c._id === courseId ? updatedCourse : c));
                if (!courseData.some((c) => c._id === courseId)) {
                    newCourseData.push(updatedCourse);
                }
            } else {
                newCourseData = courseData.filter((c) => c._id !== courseId);
            }
            dispatch(setCourseData(newCourseData));

            navigate('/courses');
            toast.success('Course updated successfully!');
        } catch (error) {
            console.error('Error updating course:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const removeCourse = async () => {
        setLoading(true);
        try {
            await axios.delete(`${serverURL}/api/course/remove-course/${courseId}`, { withCredentials: true });
            toast.success('Course deleted successfully!');
            const filteredCourses = courseData.filter((c) => c._id !== courseId);
            dispatch(setCourseData(filteredCourses));
            navigate('/courses');
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error(error.response?.data?.message || 'Failed to delete course');
        } finally {
            setLoading(false);
        }
    };

    const courseCategories = ['App Development', 'AI/ML', 'AI Tools', 'Data Science', 'Data Analytics', 'Ethical Hacking', 'UI UX Designing', 'Web Development', 'Others'];
    const courseLevels = ['Beginner', 'Intermediate', 'Advanced'];

    return (
        <div className="min-h-screen bg-gray-100 p-6 sm:p-10 text-gray-800">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                    <button onClick={() => navigate('/courses')} className="text-gray-500 hover:text-gray-800 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                        <FaArrowLeftLong className="w-6 h-6" />
                    </button>
                    <h2 className="text-3xl font-extrabold text-gray-800 flex-1 text-center">
                        Edit Course
                    </h2>
                    <button
                        onClick={() => navigate(`/create-lecture/${selectedCourse?._id}`)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition-colors duration-200 text-sm sm:text-base"
                    >
                        Manage Lectures
                    </button>
                </div>
                {selectedCourse ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/3 flex flex-col items-center space-y-6 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
                            <label className="text-xl font-bold text-gray-700">Course Thumbnail</label>
                            <label
                                htmlFor="thumbnail-upload"
                                className="relative w-full aspect-video cursor-pointer group rounded-lg overflow-hidden shadow-md border-2 border-transparent hover:border-gray-400 transition-all duration-300"
                            >
                                <img
                                    src={frontendImage}
                                    alt="Course Thumbnail"
                                    className="w-full h-full object-cover object-center"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <MdEdit className="w-10 h-10 text-white" />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="thumbnail-upload"
                                hidden
                                onChange={handleThumbnail}
                                accept="image/*"
                            />
                            <div className="w-full flex flex-col gap-4 pt-4">
                                {!isPublished ? (
                                    <button
                                        type="button"
                                        className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 transform hover:scale-105"
                                        onClick={() => setIsPublished(true)}
                                    >
                                        Publish Course
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-full bg-red-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
                                        onClick={() => setIsPublished(false)}
                                    >
                                        Unpublish Course
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={removeCourse}
                                    className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200 transform hover:scale-105"
                                    disabled={loading}
                                >
                                    {loading ? <ClipLoader size={24} color="#fff" /> : 'Remove Course'}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-6">
                            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            placeholder="Course Title"
                                            className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-200 p-3"
                                            onChange={(e) => setTitle(e.target.value)}
                                            value={title}
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Subtitle</label>
                                        <input
                                            type="text"
                                            placeholder="Course Subtitle"
                                            className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-200 p-3"
                                            onChange={(e) => setSubTitle(e.target.value)}
                                            value={subTitle}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Description</label>
                                        <textarea
                                            placeholder="Course description"
                                            className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-200 h-32 resize-none p-3"
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                        ></textarea>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Subdescription</label>
                                        <textarea
                                            type="text"
                                            placeholder="Course Subdescription"
                                            className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-200 h-32 resize-none p-3"
                                            onChange={(e) => setSubDescription(e.target.value)}
                                            value={subDescription}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Category</label>
                                        <select
                                            className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-200 p-3"
                                            onChange={(e) => setCategory(e.target.value)}
                                            value={category}
                                        >
                                            <option value="">Select Category</option>
                                            {courseCategories.map((elem, index) => (
                                                <option key={index} value={elem}>
                                                    {elem}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Course Level</label>
                                        <select
                                            className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-200 p-3"
                                            onChange={(e) => setLevel(e.target.value)}
                                            value={level}
                                        >
                                            <option value="">Select Level</option>
                                            {courseLevels.map((lvl, index) => (
                                                <option key={index} value={lvl}>
                                                    {lvl}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Price (INR)</label>
                                        <input
                                            type="number"
                                            placeholder="₹"
                                            className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 transition-colors duration-200 p-3"
                                            onChange={(e) => setPrice(e.target.value)}
                                            value={price}
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className="pt-2">
                                <button
                                    onClick={editCourseHandler}
                                    className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200 transform hover:scale-105"
                                    disabled={loading}
                                >
                                    {loading ? <ClipLoader size={24} color="white" /> : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-96">
                        <ClipLoader size={50} color="#000" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditCourse;