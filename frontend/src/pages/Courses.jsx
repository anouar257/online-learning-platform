import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import coursService from '../services/coursService';
import './Courses.css';

const CATEGORIES = [
    'Toutes',
    'Développement Web',
    'Intelligence Artificielle',
    'Cloud & DevOps'
];

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Toutes');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await coursService.getAllCours();
            setCourses(data);
        } catch (err) {
            setError('Erreur lors du chargement des cours');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch =
            course.titre?.toLowerCase().includes(search.toLowerCase()) ||
            course.description?.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === 'Toutes' ||
            course.categorie === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Get unique categories from courses
    const availableCategories = ['Toutes', ...new Set(courses.map(c => c.categorie).filter(Boolean))];

    if (loading) {
        return (
            <div className="courses-page">
                <div className="page-loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="courses-page">
            <div className="container">
                {/* Page Header */}
                <div className="page-header animate-slideUp">
                    <h1>Nos <span className="gradient-text">Cours</span></h1>
                    <p>Explorez notre catalogue de cours et commencez votre apprentissage</p>
                </div>

                {/* Filters Section */}
                <div className="filters-section animate-fadeIn">
                    {/* Search Bar */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="🔍 Rechercher un cours..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-input search-input"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="category-filter">
                        {availableCategories.map(category => (
                            <button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category === 'Toutes' && '📚 '}
                                {category === 'Développement Web' && '🌐 '}
                                {category === 'Intelligence Artificielle' && '🤖 '}
                                {category === 'Cloud & DevOps' && '☁️ '}
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="message message-error">
                        {error}
                    </div>
                )}

                {/* Results count */}
                <p className="results-count">
                    {filteredCourses.length} cours trouvé{filteredCourses.length !== 1 ? 's' : ''}
                </p>

                {/* Courses Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="courses-grid">
                        {filteredCourses.map(course => (
                            <div key={course.id} className="course-card animate-fadeIn">
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
                                    {course.categorie && (
                                        <span className="course-badge">{course.categorie}</span>
                                    )}
                                </div>
                                <div className="course-content">
                                    <h3 className="course-title">{course.titre}</h3>
                                    <p className="course-description">
                                        {course.description?.length > 100
                                            ? `${course.description.substring(0, 100)}...`
                                            : course.description}
                                    </p>
                                    <div className="course-footer">
                                        <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                                            Voir Détails
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📚</div>
                        <h3>Aucun cours trouvé</h3>
                        <p>Essayez une autre recherche ou filtre</p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => { setSearch(''); setSelectedCategory('Toutes'); }}
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
