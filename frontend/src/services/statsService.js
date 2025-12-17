import api from './api';

// Statistique service endpoints via gateway
const STATS_BASE = '/stats';

export const statsService = {
    // Get YouTube video stats
    getVideoStats: async (videoId) => {
        const response = await api.get(`${STATS_BASE}/stats/${videoId}`);
        return response;
    }
};

export default statsService;
