const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: process.env.CLOUDINARY_FOLDER_NAME },
            (error, result) => {
                if(error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

const deleteFromCloudinary = async (url) => {
    if(!url || !url.includes('cloudinary')) return;

    try {
        const parts = url.split('/');
        const fileName = parts.pop();
        const folder = parts.pop();
        const publicId = `${folder}/${fileName.split('.')[0]}`;

        await cloudinary.uploader.destroy(publicId);
    } catch(err) {
        console.log("Error eliminando img de cloudinary: ", err);
    }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary }