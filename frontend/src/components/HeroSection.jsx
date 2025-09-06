import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center text-white bg-black gap-2.5">
            <div className="max-w-4xl mx-auto flex flex-col gap-3.5 items-center justify-center">
                <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl text-white">
                    Master Your Skills
                    <br />
                    <span className="text-gray-400">Explore Our Courses</span>
                </h1>

                <p className="mb-8 text-lg text-gray-300 sm:text-xl md:text-2xl">
                    Find the perfect course to start or advance your career with our expert-led programs and hands-on projects.
                </p>

                <Link
                    to="/all-courses"
                    className="inline-block px-8 py-3 text-lg font-semibold text-black transition duration-300 bg-white rounded-full shadow-lg hover:bg-gray-200"
                >
                    Explore All Courses
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;