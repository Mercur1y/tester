import axios from "axios";
import API_URLS from "../../common/urls";

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URLS.AUTH}/signin`, {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, name, surname, role) {
    return axios.post(`${API_URLS.AUTH}/signup`, {
      username,
      email,
      password,
      name,
      surname,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();