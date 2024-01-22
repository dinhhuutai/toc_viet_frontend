import axios from 'axios';
import setAuthToken from '~/middlewares/setAuthToken';

async function uploadFiles(files, accessToken) {

    if (files) {
        const CLOUD_NAME = 'duqn7oauj';
        const PRESET_NAME = 'toc-viet-upload';
        const FOLDER_NAME = 'salon_hair_toic_viet';
        const urls = [];
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();

        formData.append('upload_preset', PRESET_NAME);
        formData.append('folder', FOLDER_NAME);

        delete axios.defaults.headers.common['Authorization'];
        for (const file of files) {
            formData.append('file', file);

            const res = await axios.post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            urls.push(res.data.secure_url);
        }
        
        if (accessToken) {
            setAuthToken(accessToken);
        }

        return urls;
    }
}

export default uploadFiles;
