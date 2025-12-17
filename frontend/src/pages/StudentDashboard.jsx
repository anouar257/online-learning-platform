import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import inscriptionService from '../services/inscriptionService';
import coursService from '../services/coursService';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const { user } = useAuth();
    const toast = useToast();

    const [inscriptions, setInscriptions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnrolledCourses();
    }, [user]);

    const fetchEnrolledCourses = async () => {
        if (!user?.id) return;

        try {
            setLoading(true);
            // Get user's inscriptions
            const inscriptionsData = await inscriptionService.getInscriptionsByEtudiant(user.id);
            setInscriptions(inscriptionsData);

            // Fetch course details for each inscription
            const coursePromises = inscriptionsData.map(async (inscription) => {
                try {
                    const course = await coursService.getCoursById(inscription.idCours);
                    return {
                        ...course,
                        inscriptionId: inscription.id,
                        dateInscription: inscription.dateInscription,
                        progression: inscription.progression || 0,
                        completed: inscription.completed || false,
                        dateCompletion: inscription.dateCompletion
                    };
                } catch (err) {
                    return null;
                }
            });

            const coursesData = await Promise.all(coursePromises);
            setCourses(coursesData.filter(c => c !== null));
        } catch (err) {
            console.error('Failed to fetch enrollments:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUnenroll = async (inscriptionId, courseTitle) => {
        if (!confirm(`Voulez-vous vraiment vous désinscrire de "${courseTitle}" ?`)) {
            return;
        }

        try {
            await inscriptionService.cancelInscription(inscriptionId);
            toast.success('Désinscription réussie');
            fetchEnrolledCourses();
        } catch (err) {
            toast.error('Erreur lors de la désinscription');
        }
    };

    const handleCompleteCourse = async (inscriptionId, courseTitle) => {
        try {
            await inscriptionService.completeCourse(inscriptionId);
            toast.success(`🎉 Félicitations ! Vous avez terminé "${courseTitle}"`);
            fetchEnrolledCourses();
        } catch (err) {
            toast.error('Erreur lors de la validation');
        }
    };

    const downloadCertificate = (course) => {
        // Create a simple certificate as downloadable content
        const certificateContent = `
╔══════════════════════════════════════════════════╗
║                                                  ║
║           CERTIFICAT DE COMPLETION               ║
║                                                  ║
║  Ce certificat est décerné à :                   ║
║                                                  ║
║         ${user?.prenom} ${user?.nom}             ║
║                                                  ║
║  Pour avoir complété avec succès le cours :      ║
║                                                  ║
║         "${course.titre}"                        ║
║                                                  ║
║  Date de completion : ${course.dateCompletion}   ║
║                                                  ║
║  Plateforme LearnHub - Online Learning Platform  ║
╚══════════════════════════════════════════════════╝
    `;

        const blob = new Blob([certificateContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificat_${course.titre.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success('Certificat téléchargé !');
    };

    const completedCount = courses.filter(c => c.completed).length;
    const inProgressCount = courses.filter(c => !c.completed).length;

    if (loading) {
        return (
            <div className="student-dashboard">
                <div className="page-loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="student-dashboard">
            <div className="container">
                {/* Header */}
                <div className="dashboard-header animate-slideUp">
                    <div className="user-welcome">
                        <div className="user-avatar-large">
                            {user?.prenom?.[0]}{user?.nom?.[0]}
                        </div>
                        <div>
                            <h1>Bonjour, {user?.prenom} ! 👋</h1>
                            <p>Continuez votre apprentissage</p>
                        </div>
                    </div>
                    <div className="dashboard-stats">
                        <div className="stat-card">
                            <span className="stat-number">{courses.length}</span>
                            <span className="stat-label">Cours Inscrits</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">{inProgressCount}</span>
                            <span className="stat-label">En Cours</span>
                        </div>
                        <div className="stat-card completed">
                            <span className="stat-number">{completedCount}</span>
                            <span className="stat-label">Terminés</span>
                        </div>
                    </div>
                </div>

                {/* In Progress Courses */}
                {inProgressCount > 0 && (
                    <section className="dashboard-section">
                        <h2>📚 Cours en Cours</h2>
                        <div className="enrolled-courses-grid">
                            {courses.filter(c => !c.completed).map(course => (
                                <div key={course.id} className="enrolled-course-card">
                                    <div className="course-thumbnail">
                                        <img
                                            src={`https://img.youtube.com/vi/${course.youtubeVideoId}/mqdefault.jpg`}
                                            alt={course.titre}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/320x180?text=Cours';
                                            }}
                                        />
                                        <div className="course-overlay">
                                            <Link to={`/learning/${course.id}`} className="play-button">
                                                ▶
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="course-content">
                                        <h3>{course.titre}</h3>
                                        {course.categorie && (
                                            <span className="badge badge-sm">{course.categorie}</span>
                                        )}
                                        <p className="enrollment-date">
                                            Inscrit le {new Date(course.dateInscription).toLocaleDateString('fr-FR')}
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="progress-wrapper">
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${course.progression}%` }}
                                                ></div>
                                            </div>
                                            <span className="progress-text">{course.progression}%</span>
                                        </div>

                                        <div className="course-actions">
                                            <Link to={`/learning/${course.id}`} className="btn btn-primary btn-sm">
                                                Continuer
                                            </Link>
                                            <button
                                                onClick={() => handleCompleteCourse(course.inscriptionId, course.titre)}
                                                className="btn btn-outline btn-sm"
                                            >
                                                ✓ Terminer
                                            </button>
                                            <button
                                                onClick={() => handleUnenroll(course.inscriptionId, course.titre)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Completed Courses */}
                {completedCount > 0 && (
                    <section className="dashboard-section">
                        <h2>🎉 Cours Terminés</h2>
                        <div className="enrolled-courses-grid">
                            {courses.filter(c => c.completed).map(course => (
                                <div key={course.id} className="enrolled-course-card completed-card">
                                    <div className="completion-badge">✓ Terminé</div>
                                    <div className="course-thumbnail">
                                        <img
                                            src={`https://img.youtube.com/vi/${course.youtubeVideoId}/mqdefault.jpg`}
                                            alt={course.titre}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/320x180?text=Cours';
                                            }}
                                        />
                                    </div>
                                    <div className="course-content">
                                        <h3>{course.titre}</h3>
                                        {course.categorie && (
                                            <span className="badge badge-success badge-sm">{course.categorie}</span>
                                        )}
                                        <p className="enrollment-date">
                                            Terminé le {new Date(course.dateCompletion).toLocaleDateString('fr-FR')}
                                        </p>

                                        <div className="course-actions">
                                            <button
                                                onClick={() => downloadCertificate(course)}
                                                className="btn btn-primary btn-sm"
                                            >
                                                📜 Télécharger Certificat
                                            </button>
                                            <Link to={`/learning/${course.id}`} className="btn btn-secondary btn-sm">
                                                Revoir
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {courses.length === 0 && (
                    <section className="dashboard-section">
                        <div className="empty-state">
                            <div className="empty-state-icon">📖</div>
                            <h3>Aucun cours inscrit</h3>
                            <p>Commencez votre apprentissage en explorant nos cours</p>
                            <Link to="/courses" className="btn btn-primary">
                                Explorer les Cours
                            </Link>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
