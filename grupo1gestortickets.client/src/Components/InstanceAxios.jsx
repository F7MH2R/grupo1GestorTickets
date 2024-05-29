// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7289/api',
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json' 
    }
});

export default axiosInstance;
