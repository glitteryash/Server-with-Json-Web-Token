import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  login(email, password) {
    return axios.post(`${API_URL}/login`, { email, password });
  }
  logout() {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return true;
    } else {
      window.alert("Please login first");
      return false;
    }
  }
  register(username, email, password, role) {
    return axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
