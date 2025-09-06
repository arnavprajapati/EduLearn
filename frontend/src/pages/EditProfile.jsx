import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUserData } from '../store/slice/userSlice.js'; 
import { serverURL } from '../App.jsx';

const EditProfile = () => {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        email: userData?.email || '',
        description: userData?.description || '', 
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(userData?.photoUrl || null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setProfileImage(null);
            setImagePreviewUrl(userData?.photoUrl || null);
        }
    };

    const updateProfile = async () => {
        setLoading(true);
        try {
            const dataToSubmit = new FormData();
            dataToSubmit.append('name', formData.name);
            dataToSubmit.append('description', formData.description); 
            if (profileImage) {
                dataToSubmit.append('photoUrl', profileImage);
            }

            const result = await axios.post(
                `${serverURL}/api/user/updateprofile`, 
                dataToSubmit, 
                { withCredentials: true }
            );

            console.log(result.data);
            dispatch(setUserData(result.data));
            navigate("/profile");
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.error(error);
            toast.error("Profile Update Error");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="md:w-1/3 flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-600 flex items-center justify-center bg-gray-700 mb-4">
                        {imagePreviewUrl ? (
                            <img src={imagePreviewUrl} alt="Profile Preview" className="object-cover object-center w-full h-full" />
                        ) : (
                            <span className="text-8xl  text-gray-500">{userData?.name ? userData.name[0].toUpperCase() : 'U'}</span>
                        )}
                    </div>
                    <label 
                        htmlFor="photoUrl" 
                        className="py-2 px-4 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                        Change Photo
                    </label>
                    <input
                        type="file"
                        id="photoUrl"
                        name="photoUrl"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
                
                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                    <h2 className="text-3xl  text-gray-800 mb-6 border-b pb-2">Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm  text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 text-base"
                            />
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm  text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="px-4 py-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed text-base"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Email cannot be changed here.
                            </p>
                        </div>
    
                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-sm  text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 text-base"
                            ></textarea>
                        </div>
    
                        <div className="flex justify-end space-x-4 pt-6 mt-auto border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="py-2 px-6 border border-gray-300 rounded-md text-sm  text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-6 border border-transparent rounded-md text-sm  text-white bg-gray-800 hover:bg-gray-700"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;