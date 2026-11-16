import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.webp'

export default function Navbar() {

    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        logout();
        toast.success('You are logged out');
        navigate('/login');
    }

    const isActive = (path) => location.pathname === path;

    return (
      <>
        <div className="navbar">
          <div className="navbar-inner">
            <div className="navbar-brand">
              <span className="brand-icon"><img src={logo} style={{width: '80px'}} alt="" /></span>
            </div>
            <div className="navbar-action">
              {currentUser ? (
                <>
                  <Link className={`nav-link ${isActive("/") ? "active" : ""}`}>
                    Products
                  </Link>
                  <div className="nav-divider"></div>
                  <div className="user-chip">
                    <div className="user-avater">
                      {currentUser.name[0].toUpperCase()}
                    </div>
                    <span className="user-name">{currentUser.name}</span>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className={`btn btn-outline btn-sm ${isActive("/login") ? "active-nav-btn" : ""}`}
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className={`btn btn-primary btn-sm ${isActive("/register") ? "active-nav-btn" : ""}`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
}