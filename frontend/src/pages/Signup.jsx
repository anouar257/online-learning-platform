import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import authService from '../services/authService';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (formData.password.length < 4) {
            setError('Le mot de passe doit contenir au moins 4 caractères');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authService.signup({
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                password: formData.password
            });
            toast.success('Inscription réussie ! Connectez-vous maintenant.');
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Erreur lors de l\'inscription');
            toast.error('Échec de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card animate-slideUp">
                    <div className="auth-header">
                        <div className="auth-logo">🎓</div>
                        <h2>Créer un Compte</h2>
                        <p>Rejoignez notre communauté d'apprenants</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="message message-error">
                                {error}
                            </div>
                        )}

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Prénom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Jean"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Dupont"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="votre@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirmer le mot de passe</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%' }}
                            disabled={loading}
                        >
                            {loading ? 'Inscription...' : 'S\'inscrire'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Déjà inscrit ?{' '}
                            <Link to="/login">Se connecter</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
