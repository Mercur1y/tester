import API_URLS from '../common/urls';
import axiosInstance from "./auth/axiosInstance";
import authHeader from "./auth/auth-header";

const testService = {
    generate: async (data) => {
        const response = await axiosInstance.post(API_URLS.TEST + "/generate", data);
        return response.data;
    },
    getAssigned: async () => {
        const res = await axiosInstance.get(API_URLS.TEST + "/assigned");
        return res.data;
    },
    getStudentTests: async () => {
        const res = await axiosInstance.get(API_URLS.TEST + "/byStudent");
        return res.data;
    },
    getById: async (id) => {
        const res = await axiosInstance.get(`${API_URLS.TEST}/${id}`);
        return res.data;
    },

    submit: async (id, content) => {
        const res = await axiosInstance.post(`${API_URLS.TEST}/${id}/submit`, content, {
            headers: { 'Content-Type': 'application/json', ...authHeader() },
        });
        return res.data;
    },
};

export default testService;
