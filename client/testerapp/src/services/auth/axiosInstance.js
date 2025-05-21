// src/services/axiosInstance.js
import axios from 'axios';
import authHeader from './auth-header';
import authService from "./auth.service";

const axiosInstance = axios.create({
    baseURL: '/', // если нужно — можешь задать API_URL по умолчанию
    headers: authHeader()
});

// Добавляем перехватчик ошибок
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            authService.logout();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;