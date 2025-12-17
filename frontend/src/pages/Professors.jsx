import { useState, useEffect } from 'react';
import coursService from '../services/coursService';
import './Professors.css';

const Professors = () => {
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = async () => {
        try {
            setLoading(true);
            const data = await coursService.getAllProfesseurs();
            setProfessors(data);
        } catch (err) {
            console.error('Failed to fetch professors:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProfessors = professors.filter(prof =>
        prof.nom?.toLowerCase().includes(search.toLowerCase()) ||
        prof.prenom?.toLowerCase().includes(search.toLowerCase()) ||
        prof.specialite?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="professors-page">
                <div className="page-loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="professors-page">
            <div className="container">
                {/* Page Header */}
                <div className="page-header animate-slideUp">
                    <h1>Nos <span className="gradient-text">Professeurs</span></h1>
                    <p>Découvrez nos experts passionnés par l'enseignement</p>
                </div>

                {/* Search Bar */}
                <div className="search-bar animate-fadeIn">
                    <input
                        type="text"
                        placeholder="🔍 Rechercher un professeur ou une spécialité..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-input search-input"
                    />
                </div>

                {/* Professors Grid */}
                {filteredProfessors.length > 0 ? (
                    <div className="professors-grid animate-fadeIn">
                        {filteredProfessors.map(prof => (
                            <div key={prof.id} className="professor-card">
                                <div className="professor-header">
                                    <div className="professor-avatar">
                                        {prof.prenom?.[0]}{prof.nom?.[0]}
                                    </div>
                                </div>
                                <div className="professor-body">
                                    <h3 className="professor-name">{prof.prenom} {prof.nom}</h3>
                                    <div className="professor-specialty">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 2L10.5 7L16 8L12 12L13 17.5L8 14.5L3 17.5L4 12L0 8L5.5 7L8 2Z" fill="currentColor"/>
                                        </svg>
                                        <span>{prof.specialite}</span>
                                    </div>
                                    <div className="professor-email">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M2 4L8 8L14 4M2 4V12H14V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <a href={`mailto:${prof.email}`}>{prof.email}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">👨‍🏫</div>
                        <h3>Aucun professeur trouvé</h3>
                        <p>Essayez une autre recherche</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Professors;
