import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8082',
    headers: {
        'Content-Type': 'application/json'
    }
});

// 添加请求拦截器，统一处理 token
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器，统一处理错误
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// 登录
export const loginUser = (credentials) => {
    return apiClient.post('/login', credentials);
};

// 注册
export const registerUser = (userData) => {
    return apiClient.post('/register', userData);
};

// 更新用户信息
export const userInformation = (userinformation) => {
    return apiClient.post('/UpdateInformation', userinformation);
};

// 保存健康数据
export const saveHealthData = (healthData) => {
    return apiClient.post('/healthdata/save', healthData);
};

// 获取历史健康数据
export const getHistoricalHealthData = () => {
  return apiClient.get('/healthdata/history');
};

// 保存饮食运动偏好
export const saveDietSportPreference = async (data) => {
    try {
        const response = await apiClient.post('/dietsportpreference/save', data);
        console.log('Diet sport preference response:', response);
        return response;
    } catch (error) {
        console.error('Error saving diet sport preference:', error);
        throw error;
    }
};

// 获取健康报告
export const getHealthReports = async () => {
    try {
        const response = await apiClient.get('/health-report/view-all');
        console.log('Health reports response:', response);
        return response;
    } catch (error) {
        console.error('Error fetching health reports:', error);
        throw error;
    }
};

// 删除健康报告
export const deleteHealthReport = async (reportId) => {
    try {
        const response = await apiClient.delete(`/health-report/delete/${reportId}`);
        return response;
    } catch (error) {
        console.error('Error deleting health report:', error);
        throw error;
    }
};