import api from './axios';

/**
 * @param {File} file
 */

export const uploadAvatarRequest = (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    return api.post('/api/upload', formData);
};