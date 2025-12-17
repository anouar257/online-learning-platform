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

    // Group by speciality
    const groupedBySpeciality = filteredProfessors.reduce((acc, prof) => {
        const specialite = prof.specialite || 'Autre';
        if (!acc[specialite]) {
            acc[specialite] = [];
        }
        acc[specialite].push(prof);
        return acc;
    }, {});

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

                {/* Professors by Speciality */}
                {Object.keys(groupedBySpeciality).length > 0 ? (
                    Object.entries(groupedBySpeciality).map(([specialite, profs]) => (
                        <div key={specialite} className="speciality-section animate-fadeIn">
                            <h2 className="speciality-title">
                                <span className="speciality-icon">📚</span>
                                {specialite}
                            </h2>
                            <div className="professors-grid">
                                {profs.map(prof => (
                                    <div key={prof.id} className="professor-card">
                                        <div className="professor-card-content">
                                            <div className="professor-avatar-large">
                                                {prof.prenom?.[0]}{prof.nom?.[0]}
                                            </div>
                                            <div className="professor-info">
                                                <h3>{prof.prenom} {prof.nom}</h3>
                                                <span className="badge">{prof.specialite}</span>
                                                <p className="professor-email">
                                                    ✉️ {prof.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
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
