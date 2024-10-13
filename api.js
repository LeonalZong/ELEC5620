import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8082',
    headers:{
        'Content-Type': 'application/json'
    }
});
export const loginUser = (credentials) => {
    return apiClient.post('/login', credentials);
};
export const registerUser = (userData) => {
    return apiClient.post('/register', userData);
}