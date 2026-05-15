import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { validateAuthField } from '../../utils/validation';
import { error } from 'generate-react-cli/src/utils/messagesUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        const err = validateAuthField(name, value);
        setErrors(prev => ({ ...prev, [name]: err }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = {};
        Object.keys(form).forEach(k=> {
            const err = validateAuthField(k, form[k]);
            if (err) newErrors[k] = err;
        })

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const result = login(form.email, form.password);
            setLoading(false);
            if (result.success) {
              toast.success("Welcome To Back");
              navigate("/");
            } else {
              toast.error(result.message);
              setErrors({ general: result.message });
            }
        }, 700);

    }

        const fieldClass = (name) =>
          `form-control ${errors[name] ? "is-invalid" : form[name] ? "is-valid" : ""}`;


    return (
      <>
        <div className="auth-page">
          <div className="bg-mesh"></div>
          <div className="auth-card fade-up">
            <div className="auth-header mb-20">
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign In Follow</p>
            </div>
            <form action="#" className="auth-form" onSubmit={handleSubmit}>
              {errors.general && (
                <div className="auth-alert fade-in">{errors.general}</div>
              )}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={form.email}
                  placeholder="Email Address"
                  className={fieldClass("email")}
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-with-action">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={fieldClass("password")}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPass((p) => !p)}
                  >
                    <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                  </button>
                  {errors.password && (
                    <span className="form-error">{errors.password}</span>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-full mt-20">
                {loading ? <span className="spinner"></span> : "Login"}
              </button>
            </form>
            <p className="auth-footer">
              Not have an account?
              <Link to="/register" className="auth-link">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </>
    );
}