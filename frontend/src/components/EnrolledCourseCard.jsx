import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignal } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const EnrolledCourseCard = ({
    image,
    category,
    title,
    id,
    author,
    level,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate a small delay before navigation
        setTimeout(() => {
            // Navigate to the lecture/course view for enrolled students
            navigate(`/view-course/${id}`);
        }, 500);
    };

    return (
        <a
            href={`/view-course/${id}`}
            onClick={handleCardClick}
            className="block w-full max-w-xs mx-auto bg-white rounded-2xl shadow-lg border border-gray-400 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
        >
            {isLoading ? (
                // Theme: ClipLoader using a gray color
                <div className="flex items-center justify-center w-full h-full p-20 text-center text-gray-700 min-h-[350px]">
                    <ClipLoader color="#4B5563" size={50} /> {/* Gray-600 color */}
                </div>
            ) : (
                <>
                    <div className="relative w-full pb-[56.25%] overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        {level && (
                            <span className="absolute top-3 left-3 z-10 bg-black text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                                {level}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col p-5 flex-1">
                        <div className="mb-2">
                            <span className="text-xs font-bold uppercase tracking-wide text-gray-700">
                                {category}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            <span className="font-medium text-gray-800">Instructor:</span> {author}
                        </p>


                        <div className="flex items-center justify-center pt-3 border-t border-gray-200">
                            <button
                                className="w-full flex items-center justify-center gap-1.5 bg-black text-white text-sm font-semibold py-2.5 px-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300 cursor-pointer"
                                aria-label={`Continue learning ${title}`}
                            >
                                Continue Course
                            </button>
                        </div>
                    </div>
                </>
            )}
        </a>
    );
};

export default EnrolledCourseCard;