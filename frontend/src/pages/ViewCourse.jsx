import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverURL } from '../App.jsx';
import { setSelectedCourseData } from '../store/slice/courseSlice.js';
import axios from 'axios';
import { FaLock, FaArrowLeft, FaEnvelope, FaUserTie } from 'react-icons/fa';
import CourseCard from '../components/CourseCard';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const ViewCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { courseData, selectedCourseData } = useSelector(state => state.course);
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);
    const [creatorData, setCreatorData] = useState(null);
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [showLockedMessage, setShowLockedMessage] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const { lectureData } = useSelector(state => state.lecture)

    const fetchCourseData = async () => {
        courseData.map((item) => {
            if (item._id === courseId) {
                dispatch(setSelectedCourseData(item))
                console.log(selectedCourseData)
                return null;
            }
        })
    }

    const checkEnrollment = () => {
        const verify = userData?.enrolledCourses?.some(c => {
            const enrolledId = typeof c === 'string' ? c : c._id;
            return enrolledId?.toString() === courseId?.toString();
        });
        console.log("Enrollment verified:", verify);
        if (verify) {
            setIsEnrolled(true);
        }
    };

    // This useEffect and the one below are moved to the top
    // to ensure all hooks are called on every render, as per
    // the Rules of Hooks. This fixes the "change in order of hooks" error.
    useEffect(() => {
        const selectedCourse = courseData.find(item => item._id === courseId);
        if (selectedCourse) {
            dispatch(setSelectedCourseData(selectedCourse));
        }
    }, [courseId, courseData, dispatch]);

    useEffect(() => {
        const getCreator = async () => {
            if (selectedCourseData?.creator) {
                try {
                    const result = await axios.post(
                        `${serverURL}/api/course/get-creator`,
                        { userId: selectedCourseData.creator._id },
                        { withCredentials: true }
                    );
                    setCreatorData(result.data);
                } catch (error) {
                    console.error("Error fetching creator:", error);
                }
            }
        };
        getCreator();
    }, [selectedCourseData]);

    useEffect(() => {
        if (selectedCourseData && selectedCourseData.lectures.length > 0) {
            const firstFreeLecture = selectedCourseData.lectures.find(lecture => lecture.isPreviewFree);
            setSelectedLecture(firstFreeLecture || selectedCourseData.lectures[0]);
        }
    }, [selectedCourseData]);

    // ✅ This useEffect was moved here to fix the bug.
    // It must be called unconditionally before any early return statements.
    useEffect(() => {
        fetchCourseData()
        checkEnrollment()
    }, [courseId, courseData, lectureData])

    const selectedCreatorCourses = courseData.filter(
        (course) => creatorData?._id && course.creator._id === creatorData._id && course._id !== courseId
    );

    // ⚠️ Conditional rendering is now done after all the hooks have been called.
    if (!selectedCourseData) {
        return <div className="flex items-center justify-center w-[100vw] h-[100vh] p-20 text-center text-gray-500">
            <ClipLoader color="#3B82F6" size={50} />
        </div>
    }

    const formatSubDescription = (text) => {
        if (!text) return null;
        return text.split('\n\n').map((paragraph, index) => (
            <div key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex} className="block">
                        {line.trim().startsWith('👉') ? <span className="text-gray-600 mr-2">▶</span> : ''}
                        {line.trim()}
                    </p>
                ))}
            </div>
        ));
    };

    const handleLectureClick = (lecture) => {
        if (lecture.isPreviewFree) {
            setSelectedLecture(lecture);
            setShowLockedMessage(false);
        } else {
            setSelectedLecture(null);
            setShowLockedMessage(true);
        }
    };

    const handleEnroll = async (courseId, userId) => {
        try {
            const orderData = await axios.post(serverURL + "/api/payment/create-order", {
                courseId,
                userId
            }, { withCredentials: true });
            console.log(orderData)
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.data.amount,
                currency: "INR",
                name: "EduLearn",
                description: "Course Enrollment Payment",
                order_id: orderData.data.id,
                handler: async function (response) {
                    console.log("Razorpay Response:", response);
                    try {
                        const verifyRes = await axios.post(serverURL + "/api/payment/verify-payment", {
                            ...response,
                            courseId,
                            userId
                        }, { withCredentials: true });
                        setIsEnrolled(true)
                        toast.success(verifyRes.data.message);
                    } catch (verifyError) {
                        toast.error("Payment verification failed.");
                        console.error("Verification Error:", verifyError);
                    }
                },
            };
            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (err) {
            toast.error("Something went wrong while enrolling.");
            console.error("Enroll Error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate('/all-courses')}
                        className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
                    >
                        <FaArrowLeft className="text-xl cursor-pointer" />
                        <span className="ml-2 text-lg font-medium cursor-pointer">Back to My Courses</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 ml-auto mr-auto">{selectedCourseData.title}</h1>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-2/3 p-6 bg-gray-100 rounded-tl-xl lg:rounded-l-xl">
                            {selectedCourseData.lectures.length === 0 ? (
                                <div className="aspect-video bg-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-700 p-4 text-center">
                                    <h2 className="text-xl font-semibold mb-2">No Lectures Yet</h2>
                                    <p className="text-gray-600">This course has no lectures yet. New lectures will be added soon!</p>
                                </div>
                            ) : (
                                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                                    {selectedLecture && selectedLecture.isPreviewFree ? (
                                        <video controls className="w-full h-full" src={selectedLecture.videoUrl} autoPlay></video>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-700 text-lg p-4 text-center">
                                            <FaLock className="text-4xl mb-4 text-gray-400" />
                                            <span>This lecture is locked. It is only available for enrolled students.</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedCourseData.lectures.length > 0 && (
                                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Content</h2>
                                    <ul className="space-y-3 max-h-96 overflow-y-auto">
                                        {selectedCourseData.lectures.map((lecture, index) => (
                                            <li
                                                key={lecture._id}
                                                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors duration-200 ${(selectedLecture?._id === lecture._id && lecture.isPreviewFree)
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                onClick={() => handleLectureClick(lecture)}
                                            >
                                                <div className="flex items-center">
                                                    <span className={`text-lg font-medium mr-3 ${selectedLecture?._id === lecture._id ? 'text-white' : 'text-gray-500'}`}>{index + 1}.</span>
                                                    <span className="flex-1 text-lg font-medium">{lecture.lectureTitle}</span>
                                                </div>
                                                {lecture.isPreviewFree ? (
                                                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                                                        Free Preview
                                                    </span>
                                                ) : (
                                                    <FaLock className="text-gray-400" />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="w-full lg:w-1/3 p-6">
                            <img
                                src={selectedCourseData.thumbnail}
                                alt={`${selectedCourseData.title} thumbnail`}
                                className="w-full h-48 rounded-lg mb-6 object-cover"
                            />
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedCourseData.title}</h2>
                            <p className="text-xl text-gray-600 mb-4">{selectedCourseData.subTitle}</p>
                            {
                                !isEnrolled ? <button className="w-full bg-gray-800 text-white text-lg font-semibold py-3 rounded-lg hover:bg-black transition-colors duration-300 mb-6 cursor-pointer"
                                    onClick={() => {
                                        handleEnroll(courseId, userData._id)
                                    }}>
                                    Enroll Now
                                </button> : <button className="w-full bg-gray-800 text-white text-lg font-semibold py-3 rounded-lg hover:bg-black transition-colors duration-300 mb-6 cursor-pointer"
                                    onClick={() => {
                                        navigate(`/view-lecture/${courseId}`)
                                    }}>
                                    Watch Now
                                </button>
                            }

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-700 leading-relaxed">{selectedCourseData.description}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Modules</h3>
                                {formatSubDescription(selectedCourseData.subDescription)}
                            </div>

                            {creatorData && (
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={creatorData.photoUrl}
                                            alt={creatorData.name}
                                            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-300"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-xl text-gray-800">{creatorData.name}</h4>
                                            <p className="text-gray-600 text-sm">{creatorData.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-gray-700">
                                        <div className="flex items-center">
                                            <FaEnvelope className="text-gray-600 mr-2" />
                                            <span>{creatorData.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaUserTie className="text-gray-600 mr-2" />
                                            <span>Educator</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {selectedCreatorCourses.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">More Courses by This Creator</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {selectedCreatorCourses.map(course => (
                                <CourseCard
                                    key={course._id}
                                    id={course._id}
                                    image={course.thumbnail}
                                    category={course.category}
                                    title={course.title}
                                    price={course.price}
                                    author={creatorData.name}
                                    level={course.level}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewCourse;