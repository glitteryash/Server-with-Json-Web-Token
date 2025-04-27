import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/courses`;

class CourseService {
  post(title, description, price, courseImage) {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = "";
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (courseImage) {
      formData.append("courseImage", courseImage);
    }
    return axios.post(API_URL, formData, {
      headers: {
        Authorization: token,
      },
    });
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
