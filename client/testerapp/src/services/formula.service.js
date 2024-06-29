import axios from 'axios';
import API_URLS from '../common/urls';
import authHeader from './auth/auth-header';

const formulaService = {
    getAll: async () => {
        try {
            const response = await axios.get(API_URLS.FORMULA, { headers: authHeader() });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await axios.get(`${API_URLS.FORMULA}/${id}`, { headers: authHeader() });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    create: async (formula) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                ...authHeader()
            };
            console.log('Request headers:', headers);
            const response = await axios.post(API_URLS.FORMULA, formula, { headers });
            return response.data;
        } catch (error) {
            console.error('Error creating formula:', error);
            throw error;
        }
    },

    update: async (id, formula) => {
        try {
            const response = await axios.put(`${API_URLS.FORMULA}/${id}`, formula, {
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader()
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            await axios.delete(`${API_URLS.FORMULA}/${id}`, { headers: authHeader() });
        } catch (error) {
            throw error;
        }
    }
};

export default formulaService;
