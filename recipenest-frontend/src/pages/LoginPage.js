// LoginPage.js
//
// Public login form. Shows a list of demo credentials at the
// bottom because this is a coursework submission and the marker
// needs to be able to log in without guessing passwords.

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // If the user was bounced here from a protected route, send
  // them back there after login. Otherwise default to /dashboard.
  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Quick-fill helper so the marker can click a demo account and
  // log in immediately without typing.
  const fillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="login-wrapper">
      <div className="card login-card">
        <h1 className="h1" style={{ textAlign: "center" }}>
          Sign in
        </h1>
        <p className="subtitle" style={{ textAlign: "center" }}>
          Enter your chef credentials to access your dashboard.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className="btn btn--primary"
            disabled={submitting}
            style={{ width: "100%", marginTop: 8 }}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <hr className="section-divider" />

        <h3 style={{ margin: "0 0 8px", fontSize: 15, color: "#555" }}>
          Demo accounts
        </h3>
        <p style={{ fontSize: 13, color: "#666", margin: "0 0 12px" }}>
          Click any of the buttons below to fill in the form, then press
          Sign in.
        </p>
        <div className="demo-buttons">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => fillDemo("marco@recipenest.com", "marco_pass_2026")}
          >
            Marco Rossi
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => fillDemo("amina@recipenest.com", "amina_pass_2026")}
          >
            Amina Yusuf
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => fillDemo("hiro@recipenest.com", "hiro_pass_2026")}
          >
            Hiro Tanaka
          </button>
        </div>

        <p style={{ marginTop: 18, fontSize: 13, color: "#888", textAlign: "center" }}>
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
