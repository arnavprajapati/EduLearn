import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverURL } from '../../App';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../store/slice/lectureSlice.js';

function CreateLecture() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const { lectureData } = useSelector(state => state.lecture);

    const [lectureTitle, setLectureTitle] = useState("");
    
    const [createLoading, setCreateLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    const createLectureHandler = async () => {
        setCreateLoading(true);
        try {
            const result = await axios.post(
                serverURL + `/api/course/create-lecture/${courseId}`,
                { lectureTitle },
                { withCredentials: true }
            );

            dispatch(setLectureData([...lectureData, result.data.lecture]));
            
            toast.success("Lecture created successfully!");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to create lecture.");
        } finally {
            setCreateLoading(false);
        }
    };

    useEffect(() => {
        const getLectures = async () => {
            try {
                const result = await axios.get(
                    serverURL + `/api/course/get-course-lectures/${courseId}`,
                    { withCredentials: true }
                );
                
                const lecturesToDispatch = result.data.lectures ?? [];
                
                dispatch(setLectureData(lecturesToDispatch));
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "Failed to fetch lectures.");
            } finally {
                setFetchLoading(false);
            }
        };
        
        if (lectureData.length === 0) {
            getLectures();
        } else {
            setFetchLoading(false);
        }
    }, [courseId, dispatch, lectureData.length]);

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-start justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">

                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <button
                        className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        onClick={() => navigate(`/edit-course/${courseId}`)}
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Add Lectures</h1>
                    <div className="w-8"></div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Create a New Lecture</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label htmlFor="lecture-title" className="block text-sm font-medium text-gray-700 mb-1">
                                Lecture Title
                            </label>
                            <input
                                id="lecture-title"
                                type="text"
                                placeholder="e.g. Enter lecture title here"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                onChange={(e) => setLectureTitle(e.target.value)}
                                value={lectureTitle}
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                className="w-full h-12 flex items-center justify-center gap-2 rounded-md bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={createLoading || !lectureTitle.trim()}
                                onClick={createLectureHandler}
                            >
                                {createLoading ? <ClipLoader size={20} color='white' /> : <><FaPlus /> Create Lecture</>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Existing Lectures</h2>
                    {fetchLoading ? (
                        <div className="flex justify-center py-6">
                            <ClipLoader size={30} color='#111827' />
                        </div>
                    ) : lectureData.length > 0 ? (
                        <div className="space-y-4 max-h-70 overflow-y-auto pr-4">
                            {lectureData.map((lecture, index) => (
                                <div
                                    key={lecture._id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
                                > 
                                    <span className="text-base font-medium text-gray-700">
                                        Lecture {index + 1}: {lecture.lectureTitle}
                                    </span>
                                    <button
                                        className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                                        onClick={() => navigate(`/edit-lecture/${courseId}/${lecture._id}`)}
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-6">No lectures have been added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateLecture;