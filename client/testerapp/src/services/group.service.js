import axiosInstance from "./auth/axiosInstance";
import API_URLS from "../common/urls";
import authHeader from "./auth/auth-header";

const groupService = {
    getAllWithStudents: async () => {
        const res = await axiosInstance.get(`${API_URLS.GROUP}/with-students`, {
            headers: authHeader()
        });
        return res.data;
    }
};

export default groupService;