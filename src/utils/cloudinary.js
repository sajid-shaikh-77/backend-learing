import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //  upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log(response, "file has been uploaded successfully");
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved file temp file as upload 
    }
}

// cloudinary.uploader
//     .upload("my_image.jpg")
//     .then(result => console.log(result));

export {uploadOnCloudinary}