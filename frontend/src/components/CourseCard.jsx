import { Link } from 'react-router-dom';
import { FaSignal } from 'react-icons/fa';

const CourseCard = ({ image, category, title, price, id, author, level }) => {
    return (
        <Link
            to={`/course/${id}`}
            className="block w-full max-w-xs mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group"
        >
            <div className="relative w-full pb-[56.25%] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                {level && (
                    <span className="absolute top-3 left-3 z-10 bg-gray-800 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
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

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <p className="text-xl font-extrabold text-gray-900">
                        ₹{price}
                    </p>
                    <button
                        className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-300"
                        aria-label={`View details for ${title}`}
                    >
                        View Details
                        <FaSignal className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;