import api from './api';

// Auth endpoints via gateway -> inscription-service
// Gateway route: /api/inscriptions/** -> inscription-service with StripPrefix=2
const AUTH_BASE = '/inscriptions/auth';

export const authService = {
    // Login user
    login: async (email, password) => {
        const response = await api.post(`${AUTH_BASE}/login`, { email, password });
        return response;
    },

    // Register new user
    signup: async (userData) => {
        const response = await api.post(`${AUTH_BASE}/signup`, userData);
        return response;
    }
};

export default authService;
