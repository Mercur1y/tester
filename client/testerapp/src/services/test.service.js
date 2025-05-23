import API_URLS from '../common/urls';
import axiosInstance from "./auth/axiosInstance";

const testService = {
    generate: async (data) => {
        const response = await axiosInstance.post(API_URLS.TEST + "/generate", data);
        return response.data;
    }
};

export default testService;
