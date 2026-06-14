import api from './axiosConfig';

export const login = async (username, password) => {
  try {
    const response = await api.post('/token/', { username, password });
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error de conexión' };
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return !!token;
};