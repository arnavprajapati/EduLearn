import { Link } from 'react-router-dom';

const CourseCard = ({ image, category, title, price, id }) => {
    return (
        <Link to={`/course/${id}`} className="block h-full"> 
            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">

                <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
                    <img
                        className="absolute top-0 left-0 h-full w-full object-cover"
                        src={image}
                        alt={title}
                    />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                            {category}
                        </p>

                        <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 group-hover:text-indigo-700">
                            {title}
                        </h3>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-2xl font-extrabold text-green-600">
                            ₹{price}
                        </p>
            
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;