import { useState } from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../components/CourseCard';
import { FiFilter } from 'react-icons/fi';
import { GiSplitCross } from 'react-icons/gi';

const categories = [
    { name: 'All', icon: '🌍' },
    { name: 'Web Dev', icon: '💻' },
    { name: 'UI UX Designing', icon: '🎨' },
    { name: 'App Dev', icon: '📱' },
    { name: 'Ethical Hacking', icon: '🛡️' },
    { name: 'AI/ML', icon: '🤖' },
    { name: 'Data Science', icon: '📊' },
    { name: 'Data Analytics', icon: '📈' },
    { name: 'AI Tools', icon: '⚙️' },
];

const AllCourses = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const { courseData } = useSelector(state => state.course);

    const filteredCourses = courseData.filter(course =>
        activeCategory === 'All' ? true : course.category === activeCategory
    );

    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
        setShowMobileFilter(false);
    };

    return (
        <div className="flex bg-gray-100 min-h-screen pt-[70px] relative overflow-x-hidden">

            <div className="hidden md:block w-64 p-4 bg-white shadow-md h-full fixed top-0 left-0 pt-26">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Categories</h2>
                <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleCategoryClick(category.name)}
                                className={`flex items-center w-full p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                                    activeCategory === category.name
                                        ? 'bg-black text-white'
                                        : 'text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <span className="mr-2 text-lg">{category.icon}</span>
                                <span className="font-medium">{category.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="md:hidden fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setShowMobileFilter(true)}
                    className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg transition-transform duration-200 transform active:scale-95"
                    aria-label="Open filter menu"
                >
                    <FiFilter className="text-2xl" />
                </button>
            </div>

            <div
                className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    showMobileFilter ? 'translate-x-0' : 'translate-x-full'
                } p-6`}
            >
                <div className="flex items-center justify-between mb-8 pt-[20px] ">
                    <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
                    <button onClick={() => setShowMobileFilter(false)}>
                        <GiSplitCross className="text-gray-800 text-2xl" />
                    </button>
                </div>
                <ul className="space-y-4">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleCategoryClick(category.name)}
                                className={`flex items-center w-full lg:p-4 p-2 rounded-lg transition-colors duration-200 text-xl ${
                                    activeCategory === category.name
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <span className="mr-4 text-xl">{category.icon}</span>
                                <span className="font-medium">{category.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 p-6 md:p-10 md:ml-64">
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCourses.map(course => (
                            <CourseCard
                                key={course._id}
                                id={course._id}
                                image={course.thumbnail}
                                category={course.category}
                                title={course.title}
                                price={course.price}
                                author={course.creator.name}
                                level={course.level}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg mt-20">
                        No courses found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCourses;