import api from './api';

// Cours service endpoints via gateway
// Gateway route: /api/cours-service/** -> cours-service with StripPrefix=2
const COURS_BASE = '/cours-service';

export const coursService = {
    // Get all courses
    getAllCours: async () => {
        const response = await api.get(`${COURS_BASE}/cours`);
        // Spring Data REST returns _embedded structure with 'courses' key
        return response?._embedded?.courses || response?._embedded?.cours || response || [];
    },

    // Get course by ID
    getCoursById: async (id) => {
        const response = await api.get(`${COURS_BASE}/cours/${id}`);
        return response;
    },

    // Create new course
    createCours: async (coursData) => {
        const response = await api.post(`${COURS_BASE}/cours`, coursData);
        return response;
    },

    // Update course
    updateCours: async (id, coursData) => {
        const response = await api.put(`${COURS_BASE}/cours/${id}`, coursData);
        return response;
    },

    // Delete course
    deleteCours: async (id) => {
        const response = await api.delete(`${COURS_BASE}/cours/${id}`);
        return response;
    },

    // Get all professors
    getAllProfesseurs: async () => {
        const response = await api.get(`${COURS_BASE}/professeurs`);
        return response?._embedded?.professeurs || response || [];
    },

    // Get professor by ID
    getProfesseurById: async (id) => {
        const response = await api.get(`${COURS_BASE}/professeurs/${id}`);
        return response;
    },

    // Create professor
    createProfesseur: async (profData) => {
        const response = await api.post(`${COURS_BASE}/professeurs`, profData);
        return response;
    },

    // Update professor
    updateProfesseur: async (id, profData) => {
        const response = await api.put(`${COURS_BASE}/professeurs/${id}`, profData);
        return response;
    },

    // Delete professor
    deleteProfesseur: async (id) => {
        const response = await api.delete(`${COURS_BASE}/professeurs/${id}`);
        return response;
    },

    // ============ AVIS (Reviews) ============
    // Get reviews for a course
    getAvisByCours: async (coursId) => {
        const response = await api.get(`${COURS_BASE}/avis/search/findByIdCours?idCours=${coursId}`);
        return response?._embedded?.avis || response || [];
    },

    // Create a review
    createAvis: async (avisData) => {
        const response = await api.post(`${COURS_BASE}/avis`, avisData);
        return response;
    }
};

export default coursService;
