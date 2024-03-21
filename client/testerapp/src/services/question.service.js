import axios from "axios";
import API_URLS from "../common/urls";

class QuestionPatternService {
  getAll() {
    return axios.get(API_URLS.QUESTION);
  }

  getById(id) {
    return axios.post(`${API_URLS.QUESTION}/getById`, id);
  }

  delete(id) {
    return axios.delete(`${API_URLS.QUESTION}/delete`, { data: id });
  }

  save(questionPatternData) {
    return axios.post(API_URLS.QUESTION, questionPatternData);
  }
}

export default new QuestionPatternService();