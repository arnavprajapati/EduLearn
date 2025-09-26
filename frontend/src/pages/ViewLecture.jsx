import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaPlayCircle } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

function ViewLecture() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { courseData } = useSelector((state) => state.course);
    const { userData } = useSelector((state) => state.user);

    const selectedCourse = courseData?.find((course) => course._id === courseId);

    const [selectedLecture, setSelectedLecture] = useState(
        selectedCourse?.lectures?.[0] || null
    );

    const isCreator = userData?._id === selectedCourse?.creator?._id;

    if (!selectedCourse) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-500">
                <ClipLoader color="#3B82F6" size={50} />
                <p className="ml-4">Loading course details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                        <FaArrowLeftLong className="text-xl mr-2" />
                        <span className="text-lg font-medium cursor-pointer">Back to Course Details</span>
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
                    <div className="w-full lg:w-2/3 p-6 sm:p-8 bg-gray-50 border-r border-gray-200">
                        <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                            {selectedLecture?.videoUrl ? (
                                <video
                                    src={selectedLecture.videoUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <div className="p-8 text-center text-gray-500 font-semibold">
                                    Select a lecture from the list to start watching.
                                </div>
                            )}
                        </div>
                        <div className="py-4">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedLecture?.lectureTitle || "Please Select a Lecture"}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {selectedLecture?.description || "Description not available for this lecture."}
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Content</h2>
                        <div className="max-h-[600px] overflow-y-auto space-y-3">
                            {selectedCourse.lectures?.length > 0 ? (
                                selectedCourse.lectures.map((lecture) => (
                                    <button
                                        key={lecture._id}
                                        onClick={() => setSelectedLecture(lecture)}
                                        className={`flex items-center justify-start w-full p-4 rounded-xl border cursor-pointer transition-all duration-300  ${
                                            selectedLecture?._id === lecture._id
                                                ? 'bg-gray-800 text-white shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <FaPlayCircle className="text-xl shrink-0" />
                                            <h4 className="text-base font-semibold text-left flex-grow break-words">
                                                {lecture.lectureTitle}
                                            </h4>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No lectures available for this course.</p>
                            )}
                        </div>

                        {isCreator && (
                            <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">About the Instructor</h3>
                                <div className="flex items-center gap-6">
                                    <img
                                        src={userData.photoUrl || '/default-avatar.png'}
                                        alt="Instructor"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                                    />
                                    <div>
                                        <h4 className="text-2xl font-semibold text-gray-800">{userData.name}</h4>
                                        <p className="text-gray-600 mt-1">{userData.description || 'No bio available.'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewLecture;