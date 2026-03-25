import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://hrms-backend-1-thsj.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const employeeAPI = {
  getAll: () => api.get('/api/employees'),
  create: (data) => api.post('/api/employees', data),
  delete: (id) => api.delete(`/api/employees/${id}`),
  stats: () => api.get('/api/employees/stats'),
 update: (id, data) => api.put(`/api/employees/${id}`, data),
};

export const attendanceAPI = {
  mark: (data) => api.post('/api/attendance', data),
  getAll: (params) => api.get('/api/attendance', { params }),
  getSummary: (employeeId) => api.get(`/api/attendance/summary/${employeeId}`),
};
