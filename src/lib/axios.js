import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL; // .env에서 가져온 서버 URL

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      await instance.post("/auth/token/refresh", undefined, { _retry: true });
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
