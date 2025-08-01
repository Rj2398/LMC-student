import axios from 'axios';
import toast from 'react-hot-toast';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("pmsc");
    const token = user ? JSON.parse(user)?.token : null;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message;
    if (message == "Unauthenticated." || error?.response?.status == 401) {
      toast.error("Token Expired");
      localStorage.removeItem("pmsc");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export const signIn = (formData) => API.post(`/login`, formData);
export const logout = () => API.post(`/logout`,{} );

export const dashboardInfo = () => API.get(`/dashboard`, {});

export const getAllSubject = () => API.post(`/stud-sub`, {});

export const getAllQuestion = (formData) => API.post(`/get-question`, formData);

export const getAttemptId = (formData) => API.post(`/start-quiz`, formData);

export const removeAttemptId = (formData) => API.post(`/delete-quiz-attempt`, formData);

export const submitAnswer = (formData) => API.post(`/submit-answers`, formData);

export const getUserProgress = (formData) => API.post(`/get-user-progress`, formData);

export const subjectWiseProgress = (formData) => API.post(`/subject-wise-performance`, formData);

export const getProfile = () => API.get(`/view-profile`);

export const updateProfile = (formData) => API.post(`/update-profile`, formData);

// --------

// get_all_lession
export const getAllLession = (formData) =>
  API.post(`/get-subject-lessons`, formData);
//
export const getLessionDetails = (formData) =>
  API.post(`/lessons-content`, formData);

// start lession
export const startLession = (formData) => API.post(`/start-lesson`, formData);

//start quiz
export const startQuiz = (formData) => API.post(`/start-quiz`, formData);

// submit lession

export const lessionSubmit = (formData) =>
  API.post(`/submit-answers`, formData);

// complete lesson
export const completeLesson = (formData) =>
  API.post(`/complete-lesson`, formData);
// get retrive previos lesson data

export const retriveLesson = (formData) =>
  API.post(`/lessons-review`, formData);
