import api from './axios';

/**
 * @param {Object} user
 */
export const registerRequest = (user) => api.post('/user/register', user);

/**
 * @param {Object} user
 */
export const loginRequest = (user) => api.post('/user/login', user);

export const verifyTokenRequest = () => api.get('/user/verify');

export const editProfileRequest = (id, user) => api.patch(`/user/${id}`, user);
