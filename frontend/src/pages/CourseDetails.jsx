import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import coursService from '../services/coursService';
import inscriptionService from '../services/inscriptionService';
import './CourseDetails.css';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const toast = useToast();

    const [course, setCourse] = useState(null);
    const [professor, setProfessor] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);

    // Review form
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ note: 5, commentaire: '' });
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            setLoading(true);
            const courseData = await coursService.getCoursById(id);
            setCourse(courseData);

            // Fetch professor if course has one
            if (courseData._links?.professeur?.href) {
                try {
                    const profResponse = await fetch(courseData._links.professeur.href);
                    const profData = await profResponse.json();
                    setProfessor(profData);
                } catch (err) {
                    console.error('Failed to fetch professor:', err);
                }
            }

            // Fetch reviews
            try {
                const reviewsData = await coursService.getAvisByCours(id);
                setReviews(reviewsData);
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
            }

            // Check if user is enrolled
            if (user?.id) {
                const inscriptions = await inscriptionService.getInscriptionsByEtudiant(user.id);
                const enrolled = inscriptions.some(i => i.idCours === parseInt(id));
                setIsEnrolled(enrolled);
            }
        } catch (err) {
            console.error('Failed to fetch course:', err);
            toast.error('Cours non trouvé');
            navigate('/courses');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!isAuthenticated()) {
            toast.warning('Connectez-vous pour vous inscrire');
            navigate('/login');
            return;
        }

        setEnrolling(true);
        try {
            await inscriptionService.inscrire(user.id, parseInt(id));
            setIsEnrolled(true);
            toast.success('Inscription réussie !');
        } catch (err) {
            if (err.message?.includes('Already enrolled')) {
                toast.warning('Vous êtes déjà inscrit à ce cours');
                setIsEnrolled(true);
            } else {
                toast.error('Erreur lors de l\'inscription');
            }
        } finally {
            setEnrolling(false);
        }
    };

    const handlePlayVideo = () => {
        if (!isAuthenticated()) {
            toast.warning('Connectez-vous pour voir la vidéo');
            navigate('/login');
            return;
        }

        if (!isEnrolled) {
            toast.warning('Inscrivez-vous au cours pour voir la vidéo');
            return;
        }

        // Redirect to course player
        navigate(`/learning/${id}`);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated()) {
            toast.warning('Connectez-vous pour laisser un avis');
            return;
        }

        setSubmittingReview(true);
        try {
            await coursService.createAvis({
                idCours: parseInt(id),
                idEtudiant: user.id,
                nomEtudiant: `${user.prenom} ${user.nom}`,
                note: reviewForm.note,
                commentaire: reviewForm.commentaire,
                dateCreation: new Date().toISOString().split('T')[0]
            });
            toast.success('Avis publié !');
            setShowReviewForm(false);
            setReviewForm({ note: 5, commentaire: '' });
            fetchCourseDetails(); // Refresh reviews
        } catch (err) {
            toast.error('Erreur lors de la publication');
        } finally {
            setSubmittingReview(false);
        }
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.note, 0) / reviews.length).toFixed(1)
        : null;

    if (loading) {
        return (
            <div className="course-details-page">
                <div className="page-loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="course-details-page">
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
        <div className="course-details-page">
            <div className="container">
                <div className="course-details-content animate-slideUp">
                    {/* Video Preview */}
                    <div className="video-section">
                        <div className="video-preview" onClick={handlePlayVideo} style={{ cursor: 'pointer' }}>
                            <img
                                src={`https://img.youtube.com/vi/${course.youtubeVideoId}/maxresdefault.jpg`}
                                alt={course.titre}
                                onError={(e) => {
                                    e.target.src = `https://img.youtube.com/vi/${course.youtubeVideoId}/hqdefault.jpg`;
                                }}
                            />
                            <div className="video-overlay">
                                <div className="play-button">▶</div>
                            </div>
                        </div>

                        {/* Course Info */}
                        <div className="course-description-section">
                            <h1>{course.titre}</h1>
                            {course.categorie && (
                                <span className="badge mb-md">{course.categorie}</span>
                            )}
                            {averageRating && (
                                <div className="course-rating">
                                    <span className="stars">{'⭐'.repeat(Math.round(averageRating))}</span>
                                    <span>{averageRating}/5 ({reviews.length} avis)</span>
                                </div>
                            )}
                            <p>{course.description}</p>

                            {professor && (
                                <div className="professor-info">
                                    <div className="professor-avatar">
                                        {professor.prenom?.[0]}{professor.nom?.[0]}
                                    </div>
                                    <div className="professor-details">
                                        <span className="professor-name">
                                            {professor.prenom} {professor.nom}
                                        </span>
                                        <span className="professor-title">{professor.specialite}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reviews Section */}
                        <div className="reviews-section">
                            <div className="reviews-header">
                                <h3>📝 Avis des étudiants ({reviews.length})</h3>
                                {isAuthenticated() && (
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => setShowReviewForm(!showReviewForm)}
                                    >
                                        {showReviewForm ? 'Annuler' : '+ Ajouter un avis'}
                                    </button>
                                )}
                            </div>

                            {/* Review Form */}
                            {showReviewForm && (
                                <form onSubmit={handleSubmitReview} className="review-form">
                                    <div className="form-group">
                                        <label className="form-label">Note</label>
                                        <div className="star-rating">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className={`star-btn ${reviewForm.note >= star ? 'active' : ''}`}
                                                    onClick={() => setReviewForm({ ...reviewForm, note: star })}
                                                >
                                                    ⭐
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Commentaire</label>
                                        <textarea
                                            className="form-input"
                                            value={reviewForm.commentaire}
                                            onChange={(e) => setReviewForm({ ...reviewForm, commentaire: e.target.value })}
                                            placeholder="Partagez votre expérience..."
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submittingReview}
                                    >
                                        {submittingReview ? 'Publication...' : 'Publier l\'avis'}
                                    </button>
                                </form>
                            )}

                            {/* Reviews List */}
                            {reviews.length > 0 ? (
                                <div className="reviews-list">
                                    {reviews.map(review => (
                                        <div key={review.id} className="review-card">
                                            <div className="review-header">
                                                <div className="reviewer-info">
                                                    <div className="reviewer-avatar">
                                                        {review.nomEtudiant?.[0] || '?'}
                                                    </div>
                                                    <div>
                                                        <span className="reviewer-name">{review.nomEtudiant}</span>
                                                        <span className="review-date">{review.dateCreation}</span>
                                                    </div>
                                                </div>
                                                <div className="review-rating">
                                                    {'⭐'.repeat(review.note)}
                                                </div>
                                            </div>
                                            <p className="review-comment">{review.commentaire}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-reviews">Aucun avis pour le moment. Soyez le premier !</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="course-sidebar">
                        <div className="course-actions-card">
                            {isEnrolled ? (
                                <Link
                                    to={`/learning/${id}`}
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%' }}
                                >
                                    Continuer le Cours →
                                </Link>
                            ) : (
                                <button
                                    onClick={handleEnroll}
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%' }}
                                    disabled={enrolling}
                                >
                                    {enrolling ? 'Inscription...' : 'S\'inscrire Gratuitement'}
                                </button>
                            )}
                            <Link to="/courses" className="btn btn-secondary" style={{ width: '100%' }}>
                                ← Retour aux cours
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
