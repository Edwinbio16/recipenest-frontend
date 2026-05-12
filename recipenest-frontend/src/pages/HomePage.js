// HomePage.js
//
// Landing page. Shows a welcome banner and three feature cards.
// The dashboard card adapts to whether the visitor is logged in:
// it offers a "Sign in" button to anonymous visitors and an "Open
// Dashboard" button to logged-in chefs.

import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function HomePage() {
  const { currentChef } = useAuth();

  return (
    <>
      <section className="banner">
        <h1>Welcome to RecipeNest</h1>
        <p>
          A community-driven recipe platform where talented chefs share their
          favourite dishes. Browse chef profiles, explore recipes from around
          the world, or sign in to your dashboard to manage your own.
        </p>
        <div className="banner__cta">
          <Link to="/chefs" className="btn">
            Meet our Chefs
          </Link>
        </div>
      </section>

      <h2 className="h2">What you can do</h2>

      <div className="card-grid">
        <div className="card">
          <h3 style={{ color: "#7a3e00", margin: "0 0 8px" }}>
            👨‍🍳 Browse Chefs
          </h3>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            Discover the chefs behind the recipes. Each chef has a public
            profile showcasing their specialty, biography, and the dishes they
            have published.
          </p>
          <Link to="/chefs" className="btn btn--ghost">
            Open Chefs page
          </Link>
        </div>

        <div className="card">
          <h3 style={{ color: "#7a3e00", margin: "0 0 8px" }}>
            🍝 Explore Recipes
          </h3>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            Browse every recipe on the platform in one place. Each card shows
            the ingredients, step-by-step instructions, category, and the chef
            who created it.
          </p>
          <Link to="/recipes" className="btn btn--ghost">
            Open Recipes page
          </Link>
        </div>

        <div className="card">
          <h3 style={{ color: "#7a3e00", margin: "0 0 8px" }}>
            🛠️ Chef Dashboard
          </h3>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            Chefs can sign in to manage their own profile (bio, specialty,
            photo) and add, edit, or delete the recipes they have shared with
            the community.
          </p>
          {currentChef ? (
            <Link to="/dashboard" className="btn btn--ghost">
              Open Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn btn--ghost">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
