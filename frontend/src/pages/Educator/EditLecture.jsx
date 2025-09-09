import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaCheckCircle, FaVideo, FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverURL } from '../../App'
import { setLectureData } from '../../store/slice/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function EditLecture() {
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [lectureDetails, setLectureDetails] = useState(null)
    const { courseId, lectureId } = useParams()
    const { lectureData } = useSelector(state => state.lecture)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [lectureTitle, setLectureTitle] = useState('')
    const [videoURL, setVideoURL] = useState(null)
    const [videoFile, setVideoFile] = useState(null)
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [existingVideoUrl, setExistingVideoUrl] = useState('')

    useEffect(() => {
        const fetchLectureDetails = async () => {
            try {
                const response = await axios.get(serverURL + `/api/course/lecture/${lectureId}`, { withCredentials: true })
                const data = response.data
                setLectureDetails(data)
                setLectureTitle(data.lectureTitle)
                setIsPreviewFree(data.isPreviewFree)
                setExistingVideoUrl(data.videoUrl)
            } catch (error) {
                console.error("Failed to fetch lecture details:", error)
                toast.error("Failed to load lecture details.")
            }
        }
        fetchLectureDetails()
    }, [lectureId])

    const handleVideoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setVideoURL(file)
            setVideoFile(file)
        }
    }

    const editLecture = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("lectureTitle", lectureTitle);
        formData.append("isPreviewFree", isPreviewFree.toString());

        if (videoURL) {
            formData.append("videoURL", videoURL);
        }
        try {
            const result = await axios.post(serverURL + `/api/course/edit-lecture/${lectureId}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const updatedLectures = lectureData.map(lecture =>
                lecture._id === lectureId ? result.data : lecture
            );
            dispatch(setLectureData(updatedLectures));

            toast.success("Lecture updated successfully!");
            navigate(`/create-lecture/${courseId}`);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update lecture.");
        } finally {
            setLoading(false);
        }
    };
    const removeLecture = async () => {
        if (!window.confirm("Are you sure you want to remove this lecture? This action cannot be undone.")) {
            return
        }

        setLoading1(true)
        try {
            await axios.delete(serverURL + `/api/course/remove-lecture/${lectureId}`, { withCredentials: true })

            const remainingLectures = lectureData.filter(lecture => lecture._id !== lectureId)
            dispatch(setLectureData(remainingLectures))

            toast.success("Lecture removed successfully.")
            navigate(`/create-lecture/${courseId}`)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to remove lecture.")
        } finally {
            setLoading1(false)
        }
    }

    if (!lectureDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <ClipLoader size={50} color='#4B5563' />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden p-8 transition-all duration-300 hover:shadow-xl">

                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => navigate(`/create-lecture/${courseId}`)} className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group cursor-pointer">
                        <FaArrowLeft className="text-gray-600 text-xl group-hover:text-black transition-colors" />
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Update Lecture
                    </h2>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                        disabled={loading1}
                        onClick={removeLecture}
                    >
                        {loading1 ? <ClipLoader size={16} color='white' /> : <><FaTrash /> Remove</>}
                    </button>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2 flex flex-col items-center">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Video Preview</h3>
                        <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                            {existingVideoUrl ? (
                                <video
                                    src={existingVideoUrl}
                                    controls
                                    className="w-full h-full object-contain bg-black"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="flex flex-col items-center text-gray-400 p-4">
                                    <FaVideo className="text-4xl mb-2" />
                                    <span className="text-sm">No video available for preview.</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:w-1/2 space-y-6">
                        <div>
                            <label htmlFor="lectureTitle" className="block text-sm font-medium text-gray-700 mb-1">Lecture Title</label>
                            <input
                                id="lectureTitle"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md text-sm placeholder-gray-400 bg-gray-50 cursor-not-allowed"
                                value={lectureTitle}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Video File (Optional)</label>
                            <div className="flex flex-wrap items-center gap-4">
                                <label htmlFor="video-upload" className="cursor-pointer bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2 shadow-sm">
                                    <FaVideo /> Choose New Video
                                </label>
                                <input
                                    id="video-upload"
                                    type="file"
                                    accept='video/*'
                                    className="hidden"
                                    onChange={handleVideoChange}
                                />
                                {videoFile ? (
                                    <span className="text-gray-600 truncate text-sm flex items-center gap-2">
                                        <FaCheckCircle className="text-green-500" />
                                        <span className="font-medium">{videoFile.name}</span>
                                    </span>
                                ) : (
                                    <span className="text-gray-500 text-sm italic">
                                        Keep existing video.
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                id="isPreviewFree"
                                type="checkbox"
                                checked={isPreviewFree}
                                className="accent-black h-4 w-4"
                                onChange={() => setIsPreviewFree(prev => !prev)}
                            />
                            <label htmlFor="isPreviewFree" className="text-sm text-gray-700 cursor-pointer">Allow free preview of this lecture?</label>
                        </div>

                        <div className="pt-4">
                            <button
                                className="w-full bg-black text-white py-3 rounded-md text-base font-medium hover:bg-gray-800 transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                                disabled={loading}
                                onClick={editLecture}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <ClipLoader size={18} color='white' />
                                        <span>Updating...</span>
                                    </span>
                                ) : (
                                    "Update Lecture"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLecture