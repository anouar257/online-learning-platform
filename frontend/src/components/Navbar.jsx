import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🎓</span>
                    <span className="logo-text">LearnHub</span>
                </Link>

                <div className="navbar-links">
                    <Link to="/" className="nav-link">Accueil</Link>
                    <Link to="/courses" className="nav-link">Cours</Link>
                    <Link to="/professors" className="nav-link">Professeurs</Link>
                </div>

                <div className="navbar-auth">
                    {isAuthenticated() ? (
                        <>
                            {isAdmin() && (
                                <Link to="/admin/dashboard" className="nav-link admin-link">
                                    ⚙️ Admin
                                </Link>
                            )}
                            <Link to="/student/dashboard" className="nav-link">
                                Mes Cours
                            </Link>
                            <div className="user-menu">
                                <span className="user-name">
                                    👤 {user?.prenom} {user?.nom}
                                </span>
                                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                    Déconnexion
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary btn-sm">
                                Connexion
                            </Link>
                            <Link to="/signup" className="btn btn-primary btn-sm">
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
