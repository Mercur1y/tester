import axios from "axios";
import API_URLS from "../common/urls";
import axiosInstance from "./auth/axiosInstance";

class QuestionPatternService {
  getAll() {
    return axiosInstance.get(API_URLS.QUESTION);
  }

  getById(id) {
    return axiosInstance.post(`${API_URLS.QUESTION}/getById`, id);
  }

  delete(id) {
    return axiosInstance.delete(`${API_URLS.QUESTION}/delete`, { data: id });
  }

  save(questionPatternData) {
    return axiosInstance.post(API_URLS.QUESTION, questionPatternData);
  }
}

export default new QuestionPatternService();