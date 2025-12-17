import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import coursService from '../services/coursService';
import statsService from '../services/statsService';
import './CoursePlayer.css';

const CoursePlayer = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [course, setCourse] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseAndStats();
    }, [id]);

    const fetchCourseAndStats = async () => {
        try {
            setLoading(true);
            const courseData = await coursService.getCoursById(id);
            setCourse(courseData);

            // Fetch YouTube stats
            if (courseData.youtubeVideoId) {
                try {
                    const statsData = await statsService.getVideoStats(courseData.youtubeVideoId);
                    setStats(statsData);
                } catch (err) {
                    console.error('Failed to fetch stats:', err);
                }
            }
        } catch (err) {
            console.error('Failed to fetch course:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num) => {
        if (!num) return '0';
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    if (loading) {
        return (
            <div className="course-player-page">
                <div className="page-loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="course-player-page">
                <div className="container">
                    <div className="empty-state">
                        <h3>Cours non trouvé</h3>
                        <Link to="/courses" className="btn btn-primary">Retour aux cours</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="course-player-page">
            <div className="player-container">
                {/* Video Player */}
                <div className="video-section">
                    <div className="video-wrapper">
                        <iframe
                            src={`https://www.youtube.com/embed/${course.youtubeVideoId}?autoplay=0&rel=0`}
                            title={course.titre}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="video-info">
                        <h1>{course.titre}</h1>
                        <p>{course.description}</p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="player-sidebar">
                    {/* User Progress Card */}
                    <div className="sidebar-card">
                        <h3>👤 Bienvenue</h3>
                        <p className="user-greeting">
                            {user?.prenom} {user?.nom}
                        </p>
                        <div className="progress-indicator">
                            <span className="badge badge-success">En cours</span>
                        </div>
                    </div>

                    {/* Video Stats Card */}
                    {stats && (
                        <div className="sidebar-card stats-card">
                            <h3>📊 Statistiques YouTube</h3>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-icon">👁️</span>
                                    <span className="stat-value">{formatNumber(stats.viewCount)}</span>
                                    <span className="stat-label">Vues</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">👍</span>
                                    <span className="stat-value">{formatNumber(stats.likeCount)}</span>
                                    <span className="stat-label">Likes</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">💬</span>
                                    <span className="stat-value">{formatNumber(stats.commentCount)}</span>
                                    <span className="stat-label">Commentaires</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="sidebar-actions">
                        <Link to="/student/dashboard" className="btn btn-secondary">
                            ← Mes Cours
                        </Link>
                        <Link to="/courses" className="btn btn-outline">
                            Voir Plus de Cours
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
