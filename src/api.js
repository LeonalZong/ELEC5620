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
export const userInformation = (userinformation) =>{
    return apiClient.post('/UpdateInformation', userinformation)
}
export const saveHealthData = (healthData) => {
    const token = localStorage.getItem('token'); // 从本地存储中获取令牌
    return apiClient.post('/healthdata/save', healthData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}