import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center text-gray-900 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col gap-6 items-center justify-center relative z-10 p-4">
                
                <p className="px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-600 bg-gray-100 rounded-full border border-gray-200">
                    Learn, Create, Succeed.
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-gray-900">
                    Master Your Skills
                    <br />
                    <span className="block mt-2 text-gray-800">Explore Our Courses</span>
                </h1>

                <p className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    Find the perfect course to start or advance your career with our expert-led programs, hands-on projects, and flexible learning paths.
                </p>

                <Link
                    to="/all-courses"
                    className="mt-10 inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-gray-900 rounded-full shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                    Explore All Courses
                    <FaArrowRight className="w-4 h-4 ml-2.5" />
                </Link>

                <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest font-medium">
                    10,000+ Learners Trust EduLearn
                </p>
            </div>
        </div>
    );
};

export default HeroSection;