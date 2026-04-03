import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

});


api.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const register = async (name, email, password, passwordConfirmation) => {
  const response = await api.post('/register', {name, email, password, password_confirmation: passwordConfirmation,
  });
  return response.data;
};


export const login = async(email, password) =>{
    const response = await api.post('/login', {email, password});
    if(response.data.token){
        localStorage.setItem('token', response.data.token)
    }
    return response.data
};

export const logout = async()=>{
    const response = await api.post('/logout');
    localStorage.removeItem('token');
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/me');
    return response.data;
};

export const updateProfile = async (name, email) => {
    const response = await api.put('/me', { name, email });
    return response.data;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const changePassword = async (currentPassword, newPassword, newPasswordConfirmation) => {
    const response = await api.put('/me/password', {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPasswordConfirmation
    });
    return response.data;
};
