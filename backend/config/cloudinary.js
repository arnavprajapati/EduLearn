import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

const uploadOnCloudinary = async (filePath) => {
    if (!filePath || typeof filePath !== 'string') {
        console.error('Validation Error: File path is missing or invalid.');
        return null;
    }

    try {
        if (!fs.existsSync(filePath)) {
            console.error(`File does not exist: ${filePath}`);
            return null;
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

        console.log("File uploaded successfully to Cloudinary. Public URL:", uploadResult.secure_url);

        await unlinkAsync(filePath);
        console.log("Local file deleted successfully.");

        return uploadResult.secure_url;

    } catch (error) {
        console.error(`Cloudinary upload failed for ${filePath}: ${error.message}`);
        
        if (fs.existsSync(filePath)) {
            try {
                await unlinkAsync(filePath);
                console.log(`Local file cleaned up after failed upload: ${filePath}`);
            } catch (cleanupError) {
                console.error(`Failed to delete local file during cleanup: ${filePath}`, cleanupError);
            }
        }
        
        throw error;
    }
};

export default uploadOnCloudinary;