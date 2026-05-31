import axios from "axios";
  
const URL = 'http://localhost:3000/';

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;