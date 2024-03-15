import axiosClient2 from './axiosClient2';

const cloudinaryApi = {
    uploadVideo: (file) => {
        const cloudName = process.env.REACT_APP_CLOUD_NAME;
        const presetName = process.env.REACT_APP_CLOUD_PRESET_NAME;
        const folderName = process.env.REACT_APP_CLOUD_FOLDER_NAME;
        const url = `/${cloudName}/video/upload`;
        const params = new FormData();
        params.append('file', file);
        params.append('upload_preset', presetName);
        params.append('folder', folderName);
        return axiosClient2.post(url, params);
    },
};
export default cloudinaryApi;
