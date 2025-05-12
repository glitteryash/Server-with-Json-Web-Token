import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}/user`;

class AuthService {
  login(email, password) {
    return axios.post(`${API_URL}/login`, { email, password });
  }
  logout() {
    let token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return true;
    } else {
      window.alert('Please login first');
      return false;
    }
  }
  register(username, email, password, role, profileImage) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (profileImage) {
      formData.append('avatar', profileImage);
    }
    return axios.post(`${API_URL}/register`, formData);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  updateUser(username, password, confirmPassword, file) {
    let token;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    } else {
      token = '';
    }
    const formData = new FormData();
    if (username) {
      formData.append('username', username);
    }
    if (password) {
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
    }

    if (file) {
      formData.append('avatar', file);
    }
    return axios.patch(`${API_URL}/update`, formData, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new AuthService();
