import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",   //    //    base URL for the API
  withCredentials: true,     //    send cookies with requests
});