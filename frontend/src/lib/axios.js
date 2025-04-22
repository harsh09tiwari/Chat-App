import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",    //    //    base URL for the API
  withCredentials: true,     //    send cookies with requests
});