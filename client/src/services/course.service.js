import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  post(title, description, price) {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getEnrolledCourses(_id) {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/student/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  getCourseByName(name) {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/findbyname/${name}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  get(_id) {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/instructor/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  enroll(course_id, student_id) {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = "";
    }
    return axios.post(
      `${API_URL}/enroll/${course_id}`,
      { student_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new CourseService();
