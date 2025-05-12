import axios from 'axios';
const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;


export const cloudinaryUpload = async (file:File) => {
    const formData = new FormData();
    formData.append('file', file),
    formData.append('upload_preset', preset)

    try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
        );
        return res.data.secure_url;
      } catch (error) {
        console.log(error);
    }
}