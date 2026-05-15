import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { validateAuthField } from "../../utils/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({
            ...form, [name]: value,
        });
        if (name !== 'confirmPassword') {
            const err = validateAuthField(name, value);
            setErrors(prev => ({ ...prev, [name]: err }));
        } else {
            setErrors(prev => ({ ...prev, confirmPassword: value !== form.password ? 'Please The two passwords do not match.' : null }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = {};
        console.log(form);
        const fields = ["name", "email", "password"];
        fields.forEach((k) => {
          const err = validateAuthField(k, form[k]);
          if (err) newErrors[k] = err;
        });

        if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'The two passwords do not match.';
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            const result = register(form.name, form.email, form.password);
            console.log(result)
            setLoading(false);
            if (result.success) {
                toast.success("Account created successfully! Log in now");
                navigate('/login');
            } else {
                toast.error(result.message);
                setErrors({ general: result.message });
            }
        }, 700);

    }

    const fieldClass = (name) => `form-control ${errors[name] ? 'is-invalid' : form[name] ? 'is-valid': ''}`;

    const strength = () => {
        const p = form.password;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 6) s++;
        if (p.length >= 10) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    }

    const strengthLabel = ['', 'Very Weak', 'Weak', 'Average', 'Strong', 'Very Strong'];
      const strengthColor = [
        "",
        "#f75f5f",
        "#f5a623",
        "#f5d623",
        "#10d48e",
        "#4f8ef7",
    ];
    const s = strength();


  return (
    <>
      <div className="auth-page">
        <div className="bg-mesh"></div>
        <div className="auth-card auth-card--wide fade-up">
          <div className="auth-header mb-20">
            <h1 className="auth-title">Create Account New</h1>
            <p className="auth-subtitle">Join ProductHub Today</p>
          </div>
          <form action="#" className="auth-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="auth-alert fade-in">{errors.general}</div>
            )}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  id="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={fieldClass("name")}
                />
                {errors.name && (
                  <span className="form-error">{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="example@gmail.com"
                  className={fieldClass("email")}
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>
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
                  onChange={handleChange}
                  value={form.password}
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
              </div>
              {form.password && (
                <div className="strength-bar">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="strength-seg"
                      style={{
                        background: i <= s ? strengthColor[s] : "var(--border)",
                      }}
                    ></div>
                  ))}
                  <span
                    className="strength-label ms"
                    style={{ color: strengthColor[s], display: 'block' }}
                  >
                    {strengthLabel[s]}
                  </span>
                </div>
              )}
              {errors.password && (
                <span className="form-error">{errors.password}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                value={form.confirmPassword}
                id="confirmPassword"
                placeholder="Confirm Password"
                className={fieldClass("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="form-error">{errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-full mt-20">
              {loading ? <span className="spinner"></span> : "Create Account"}
            </button>
          </form>
          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}