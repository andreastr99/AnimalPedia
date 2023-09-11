import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});


// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    try {
        const response = await axios.get('http://localhost:8081/auth/refreshToken', { withCredentials: true });

        const newAccessToken = response?.data?.accessToken;

        // Update the access token in localStorage
        localStorage.setItem('accessToken', newAccessToken);
        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
    } catch (refreshError) {
        // Handle refresh token errors, e.g., redirect to login page
        console.log('Refresh token error:', refreshError);
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
    }
});

export default api;