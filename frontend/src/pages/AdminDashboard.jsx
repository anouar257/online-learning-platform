import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import coursService from '../services/coursService';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const toast = useToast();

    const [activeTab, setActiveTab] = useState('courses');
    const [courses, setCourses] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [showProfForm, setShowProfForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [editingProf, setEditingProf] = useState(null);

    const [courseForm, setCourseForm] = useState({
        titre: '',
        description: '',
        youtubeVideoId: '',
        categorie: '',
        professeurId: ''
    });

    const [profForm, setProfForm] = useState({
        nom: '',
        prenom: '',
        email: '',
        specialite: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [coursesData, profsData] = await Promise.all([
                coursService.getAllCours(),
                coursService.getAllProfesseurs()
            ]);
            setCourses(coursesData);
            setProfessors(profsData);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Course CRUD
    const handleCourseSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare course data with professor relationship
            const courseData = {
                titre: courseForm.titre,
                description: courseForm.description,
                youtubeVideoId: courseForm.youtubeVideoId,
                categorie: courseForm.categorie
            };

            // Add professor if selected
            if (courseForm.professeurId) {
                courseData.professeur = `/professeurs/${courseForm.professeurId}`;
            }

            if (editingCourse) {
                await coursService.updateCours(editingCourse.id, courseData);
                toast.success('Cours modifié avec succès');
            } else {
                await coursService.createCours(courseData);
                toast.success('Cours créé avec succès');
            }
            resetCourseForm();
            fetchData();
        } catch (err) {
            console.error('Error saving course:', err);
            toast.error('Erreur lors de la sauvegarde du cours');
        }
    };

    const handleEditCourse = async (course) => {
        setEditingCourse(course);
        
        // Get professor ID if exists
        let professeurId = '';
        if (course._links?.professeur?.href) {
            const profId = course._links.professeur.href.split('/').pop();
            professeurId = profId;
        }

        setCourseForm({
            titre: course.titre || '',
            description: course.description || '',
            youtubeVideoId: course.youtubeVideoId || '',
            categorie: course.categorie || '',
            professeurId: professeurId
        });
        setShowCourseForm(true);
    };

    const handleDeleteCourse = async (id) => {
        if (!confirm('Supprimer ce cours ?')) return;
        try {
            await coursService.deleteCours(id);
            toast.success('Cours supprimé');
            fetchData();
        } catch (err) {
            toast.error('Erreur lors de la suppression');
        }
    };

    const resetCourseForm = () => {
        setCourseForm({ titre: '', description: '', youtubeVideoId: '', categorie: '', professeurId: '' });
        setEditingCourse(null);
        setShowCourseForm(false);
    };

    // Professor CRUD
    const handleProfSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProf) {
                await coursService.updateProfesseur(editingProf.id, profForm);
                toast.success('Professeur modifié avec succès');
            } else {
                await coursService.createProfesseur(profForm);
                toast.success('Professeur créé avec succès');
            }
            resetProfForm();
            fetchData();
        } catch (err) {
            toast.error('Erreur lors de la sauvegarde du professeur');
        }
    };

    const handleEditProf = (prof) => {
        setEditingProf(prof);
        setProfForm({
            nom: prof.nom || '',
            prenom: prof.prenom || '',
            email: prof.email || '',
            specialite: prof.specialite || ''
        });
        setShowProfForm(true);
    };

    const handleDeleteProf = async (id) => {
        if (!confirm('Supprimer ce professeur ?')) return;
        try {
            await coursService.deleteProfesseur(id);
            toast.success('Professeur supprimé');
            fetchData();
        } catch (err) {
            toast.error('Erreur lors de la suppression');
        }
    };

    const resetProfForm = () => {
        setProfForm({ nom: '', prenom: '', email: '', specialite: '' });
        setEditingProf(null);
        setShowProfForm(false);
    };

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="page-loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="container">
                {/* Header */}
                <div className="admin-header animate-slideUp">
                    <h1>⚙️ Tableau de Bord Admin</h1>
                    <p>Gérez les cours et les professeurs</p>
                </div>

                {/* Stats */}
                <div className="admin-stats">
                    <div className="stat-card">
                        <span className="stat-icon">📚</span>
                        <span className="stat-number">{courses.length}</span>
                        <span className="stat-label">Cours</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon">👨‍🏫</span>
                        <span className="stat-number">{professors.length}</span>
                        <span className="stat-label">Professeurs</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courses')}
                    >
                        📚 Cours
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'professors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('professors')}
                    >
                        👨‍🏫 Professeurs
                    </button>
                </div>

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                    <div className="tab-content animate-fadeIn">
                        <div className="section-header">
                            <h2>Gestion des Cours</h2>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowCourseForm(true)}
                            >
                                + Ajouter un Cours
                            </button>
                        </div>

                        {/* Course Form Modal */}
                        {showCourseForm && (
                            <div className="modal-overlay" onClick={resetCourseForm}>
                                <div className="modal" onClick={e => e.stopPropagation()}>
                                    <h3>{editingCourse ? 'Modifier le Cours' : 'Nouveau Cours'}</h3>
                                    <form onSubmit={handleCourseSubmit}>
                                        <div className="form-group">
                                            <label className="form-label">Titre</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={courseForm.titre}
                                                onChange={e => setCourseForm({ ...courseForm, titre: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-input"
                                                value={courseForm.description}
                                                onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                                                required
                                                rows="3"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Catégorie</label>
                                            <select
                                                className="form-input"
                                                value={courseForm.categorie}
                                                onChange={e => setCourseForm({ ...courseForm, categorie: e.target.value })}
                                                required
                                            >
                                                <option value="">Sélectionner une catégorie</option>
                                                <option value="Développement Web">Développement Web</option>
                                                <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                                                <option value="Cloud & DevOps">Cloud & DevOps</option>
                                                <option value="Mobile">Mobile</option>
                                                <option value="Data Science">Data Science</option>
                                                <option value="Sécurité">Sécurité</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Professeur</label>
                                            <select
                                                className="form-input"
                                                value={courseForm.professeurId}
                                                onChange={e => setCourseForm({ ...courseForm, professeurId: e.target.value })}
                                            >
                                                <option value="">Aucun professeur</option>
                                                {professors.map(prof => (
                                                    <option key={prof.id} value={prof.id}>
                                                        {prof.prenom} {prof.nom} - {prof.specialite}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">ID Vidéo YouTube</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={courseForm.youtubeVideoId}
                                                onChange={e => setCourseForm({ ...courseForm, youtubeVideoId: e.target.value })}
                                                placeholder="ex: dQw4w9WgXcQ"
                                                required
                                            />
                                            <small style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>
                                                L'ID YouTube se trouve dans l'URL: youtube.com/watch?v=<strong>ID_ICI</strong>
                                            </small>
                                        </div>
                                        <div className="modal-actions">
                                            <button type="button" className="btn btn-secondary" onClick={resetCourseForm}>
                                                Annuler
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                {editingCourse ? 'Modifier' : 'Créer'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Courses Table */}
                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Titre</th>
                                        <th>Catégorie</th>
                                        <th>Professeur</th>
                                        <th>YouTube ID</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => {
                                        // Get professor name if exists
                                        let profName = 'Aucun';
                                        if (course._links?.professeur) {
                                            const profId = course._links.professeur.href.split('/').pop();
                                            const prof = professors.find(p => p.id.toString() === profId);
                                            if (prof) profName = `${prof.prenom} ${prof.nom}`;
                                        }

                                        return (
                                            <tr key={course.id}>
                                                <td>{course.id}</td>
                                                <td>{course.titre}</td>
                                                <td><span className="badge">{course.categorie || 'Non catégorisé'}</span></td>
                                                <td>{profName}</td>
                                                <td>
                                                    <code style={{ fontSize: '11px' }}>{course.youtubeVideoId}</code>
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button
                                                            className="btn btn-sm btn-secondary"
                                                            onClick={() => handleEditCourse(course)}
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDeleteCourse(course.id)}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Professors Tab */}
                {activeTab === 'professors' && (
                    <div className="tab-content animate-fadeIn">
                        <div className="section-header">
                            <h2>Gestion des Professeurs</h2>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowProfForm(true)}
                            >
                                + Ajouter un Professeur
                            </button>
                        </div>

                        {/* Professor Form Modal */}
                        {showProfForm && (
                            <div className="modal-overlay" onClick={resetProfForm}>
                                <div className="modal" onClick={e => e.stopPropagation()}>
                                    <h3>{editingProf ? 'Modifier le Professeur' : 'Nouveau Professeur'}</h3>
                                    <form onSubmit={handleProfSubmit}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Prénom</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={profForm.prenom}
                                                    onChange={e => setProfForm({ ...profForm, prenom: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Nom</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={profForm.nom}
                                                    onChange={e => setProfForm({ ...profForm, nom: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                value={profForm.email}
                                                onChange={e => setProfForm({ ...profForm, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Spécialité</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={profForm.specialite}
                                                onChange={e => setProfForm({ ...profForm, specialite: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="modal-actions">
                                            <button type="button" className="btn btn-secondary" onClick={resetProfForm}>
                                                Annuler
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                {editingProf ? 'Modifier' : 'Créer'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Professors Table */}
                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Prénom</th>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        <th>Spécialité</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professors.map(prof => (
                                        <tr key={prof.id}>
                                            <td>{prof.id}</td>
                                            <td>{prof.prenom}</td>
                                            <td>{prof.nom}</td>
                                            <td>{prof.email}</td>
                                            <td><span className="badge">{prof.specialite}</span></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => handleEditProf(prof)}
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDeleteProf(prof.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
