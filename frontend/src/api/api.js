import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────
export const loginAdmin = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data);

// ── Journals ──────────────────────────────────────────────────────
export const getJournals = (params = {}) =>
  api.get('/journals', { params }).then((r) => r.data);

export const getJournal = (id) =>
  api.get(`/journals/${id}`).then((r) => r.data);

export const createJournal = (formData) =>
  api.post('/admin/journals', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);

export const updateJournal = (id, formData) =>
  api.put(`/admin/journals/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);

export const deleteJournal = (id) =>
  api.delete(`/admin/journals/${id}`).then((r) => r.data);

// ── Articles ─────────────────────────────
export const getArticles = async (params = {}) => {
  const res = await api.get("/articles", { params });

  return {
    data: res.data?.data || [],
    total: res.data?.total || 0,
    page: res.data?.page || 1,
    limit: res.data?.limit || 10,
  };
};

export const getArticle = (id) =>
  api.get(`/articles/${id}`).then((r) => r.data);

export const createArticle = (formData) =>
  api.post('/admin/articles', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);

export const updateArticle = (id, formData) =>
  api.put(`/admin/articles/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);

export const deleteArticle = (id) =>
  api.delete(`/admin/articles/${id}`).then((r) => r.data);

export const bulkUploadArticles = (formData) =>
  api.post('/admin/articles/bulk-upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);

export const downloadTemplate = () =>
  api.get('/admin/template', { responseType: 'blob' }).then((r) => r.data);

// ── Contact ───────────────────────────────────────────────────────
export const submitContact = (data) =>
  api.post('/contact', data).then((r) => r.data);

export const getContactMessages = () =>
  api.get('/admin/contact-messages').then((r) => r.data);

export const deleteContactMessage = (id) =>
  api.delete(`/admin/contact-messages/${id}`).then((r) => r.data);

export const updateContactMessageStatus = (id, status) =>
  api.put(`/admin/contact-messages/${id}/status`, { status }).then((r) => r.data);

export const getContactInfo = () =>
  api.get('/contact-info').then((r) => r.data);

export const updateContactInfo = (data) =>
  api.put('/admin/contact-info', data).then((r) => r.data);

// ── Dashboard ─────────────────────────────────────────────────────
export const getDashboardStats = () =>
  api.get('/admin/dashboard/stats').then((r) => r.data);


export default api;
