import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('File path is missing');
        }

        if (!fs.existsSync(filePath)) {
            throw new Error(`File does not exist: ${filePath}`);
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: 'eduLearn',
            resource_type: 'auto',
        });

        fs.unlinkSync(filePath);
        return uploadResult.secure_url;
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

export default uploadOnCloudinary;