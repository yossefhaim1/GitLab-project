import axios from "axios";

const api = axios.create({
  baseURL: "https://qldb72lt-3000.uks1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;