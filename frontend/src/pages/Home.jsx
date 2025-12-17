import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import coursService from '../services/coursService';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await coursService.getAllCours();
                setCourses(data.slice(0, 6)); // Show only first 6 courses
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-gradient"></div>
                    <div className="hero-particles"></div>
                </div>
                <div className="container hero-content">
                    <div className="hero-text animate-slideUp">
                        <span className="hero-badge">🚀 Plateforme d'apprentissage moderne</span>
                        <h1>Apprenez <span className="gradient-text">Sans Limites</span></h1>
                        <p>
                            Découvrez des cours de qualité dispensés par des professeurs experts.
                            Développez vos compétences et atteignez vos objectifs professionnels.
                        </p>
                        <div className="hero-actions">
                            <Link to="/courses" className="btn btn-primary btn-lg">
                                Explorer les Cours
                            </Link>
                            {!isAuthenticated() && (
                                <Link to="/signup" className="btn btn-secondary btn-lg">
                                    Commencer Gratuitement
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hero-stats animate-fadeIn">
                        <div className="stat-item">
                            <span className="stat-number">100+</span>
                            <span className="stat-label">Cours</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Professeurs</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">1000+</span>
                            <span className="stat-label">Étudiants</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features">
                <div className="container">
                    <div className="section-title">
                        <h2>Pourquoi Nous Choisir ?</h2>
                        <p>Une expérience d'apprentissage exceptionnelle</p>
                    </div>
                    <div className="grid grid-3">
                        <div className="feature-card">
                            <div className="feature-icon">📹</div>
                            <h4>Vidéos HD</h4>
                            <p>Apprenez avec des vidéos de haute qualité intégrées depuis YouTube</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">👨‍🏫</div>
                            <h4>Experts Qualifiés</h4>
                            <p>Nos professeurs sont des experts reconnus dans leurs domaines</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h4>Progression Suivie</h4>
                            <p>Suivez votre progression et gérez vos inscriptions facilement</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="section courses-preview">
                <div className="container">
                    <div className="section-title">
                        <h2>Cours Populaires</h2>
                        <p>Découvrez nos cours les plus suivis</p>
                    </div>

                    {loading ? (
                        <div className="page-loading">
                            <div className="spinner"></div>
                        </div>
                    ) : courses.length > 0 ? (
                        <>
                            <div className="grid grid-3">
                                {courses.map(course => (
                                    <div key={course.id} className="course-card">
                                        <div className="course-thumbnail">
                                            <img
                                                src={`https://img.youtube.com/vi/${course.youtubeVideoId}/mqdefault.jpg`}
                                                alt={course.titre}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/320x180?text=Cours';
                                                }}
                                            />
                                            <div className="course-overlay">
                                                <span className="play-icon">▶</span>
                                            </div>
                                        </div>
                                        <div className="course-info">
                                            <h4>{course.titre}</h4>
                                            <p>{course.description?.substring(0, 80)}...</p>
                                            <Link to={`/courses/${course.id}`} className="btn btn-outline btn-sm">
                                                Voir Détails
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-xl">
                                <Link to="/courses" className="btn btn-primary">
                                    Voir Tous les Cours →
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <p>Aucun cours disponible pour le moment</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2>Prêt à Commencer Votre Voyage ?</h2>
                        <p>Inscrivez-vous maintenant et accédez à des centaines de cours</p>
                        {!isAuthenticated() ? (
                            <Link to="/signup" className="btn btn-primary btn-lg">
                                S'inscrire Gratuitement
                            </Link>
                        ) : (
                            <Link to="/courses" className="btn btn-primary btn-lg">
                                Explorer les Cours
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
