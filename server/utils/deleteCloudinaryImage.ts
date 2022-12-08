const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});


export const deleteImage = async (imageId: string) => {
    try {
        return await cloudinary.v2.uploader.destroy(`instapp/${imageId}`)     
    } catch (error) {
        return 
    }
}
