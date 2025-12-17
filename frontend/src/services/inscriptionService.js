import api from './api';

// Inscription service endpoints via gateway
// Gateway route: /api/inscriptions/** -> inscription-service with StripPrefix=2
const INSCRIPTION_BASE = '/inscriptions';

export const inscriptionService = {
    // Enroll in a course
    inscrire: async (idEtudiant, idCours) => {
        const response = await api.post(`${INSCRIPTION_BASE}/inscriptions`, {
            idEtudiant,
            idCours
        });
        return response;
    },

    // Get student's enrollments
    getInscriptionsByEtudiant: async (etudiantId) => {
        const response = await api.get(`${INSCRIPTION_BASE}/inscriptions/etudiant/${etudiantId}`);
        return response || [];
    },

    // Cancel enrollment
    cancelInscription: async (id) => {
        const response = await api.delete(`${INSCRIPTION_BASE}/inscriptions/${id}`);
        return response;
    },

    // Update progression
    updateProgression: async (inscriptionId, progression) => {
        const response = await api.put(`${INSCRIPTION_BASE}/inscriptions/${inscriptionId}/progression`, {
            progression
        });
        return response;
    },

    // Mark course as completed
    completeCourse: async (inscriptionId) => {
        const response = await api.put(`${INSCRIPTION_BASE}/inscriptions/${inscriptionId}/complete`, {});
        return response;
    }
};

export default inscriptionService;
