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
export const saveHealthData = (saveHealthData) =>{
    return apiClient.post('/healthdata/save', saveHealthData)
}
export const saveDietSportPreference = async (data) => {
    console.log('Sending diet sport preference data:', data);
    try {
      const response = await apiClient.post('/dietsportpreference/save', data);
      console.log('Diet sport preference response:', response);
      return response;
    } catch (error) {
      console.error('Error saving diet sport preference:', error);
      throw error;
    }
  };

export const getDietSportPreference = (userId) => {
    return apiClient.get(`/dietsportpreference/get/${userId}`);
};