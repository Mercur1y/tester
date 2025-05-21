import API_URLS from '../common/urls';
import authHeader from './auth/auth-header';
import axiosInstance from "./auth/axiosInstance";

const testPatternService = {
    getAll: async () => {
        const response = await axiosInstance.get(API_URLS.TEST_PATTERN, { headers: authHeader() });
        return response.data;
    },

    getById: async (id) => {
        const response = await axiosInstance.get(`${API_URLS.TEST_PATTERN}/${id}`, { headers: authHeader() });
        return response.data;
    },

    create: async (testPattern) => {
        const response = await axiosInstance.post(API_URLS.TEST_PATTERN + "/saveWithFormulas", testPattern, {
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        });
        return response.data;
    },

    update: async (id, testPattern) => {
        const response = await axiosInstance.put(`${API_URLS.TEST_PATTERN}/${id}`, testPattern, {
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            }
        });
        return response.data;
    },

    delete: async (id) => {
        await axiosInstance.delete(`${API_URLS.TEST_PATTERN}/${id}`, { headers: authHeader() });
    }
};

export default testPatternService;
