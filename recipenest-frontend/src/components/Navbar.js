// Navbar.js
//
// Site-wide navigation bar. Shows the standard public links plus
// either a "Sign in" button (when logged out) or a welcome message
// and "Sign out" button (when logged in). Logging out drops the
// user back to the home page.

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { currentChef, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive ? "navbar__link navbar__link--active" : "navbar__link";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Show only the chef's first name in the navbar greeting so the
  // bar doesn't get overcrowded on smaller screens.
  const firstName = currentChef
    ? currentChef.fullName.replace(/^Chef\s+/i, "").split(" ")[0]
    : null;

  return (
    <nav className="navbar">
      <div className="navbar__brand">RecipeNest 🍽️</div>
      <div className="navbar__links">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/chefs" className={linkClass}>
          Chefs
        </NavLink>
        <NavLink to="/recipes" className={linkClass}>
          Recipes
        </NavLink>

        {currentChef ? (
          <>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <span className="navbar__greeting">Hi, {firstName}</span>
            <button onClick={handleLogout} className="navbar__logout">
              Sign out
            </button>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>
            Sign in
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
