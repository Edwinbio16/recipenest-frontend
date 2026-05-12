// ChefProfilePage.js
//
// Public-facing profile page for a single chef, accessed via the
// URL /chefs/:id. Shows the chef's photo, biography, specialty,
// contact email, and the list of recipes they have published.

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../api";
import RecipeCard from "../components/RecipeCard";

function fallbackAvatar(name) {
  const safeName = encodeURIComponent(name || "Chef");
  return `https://ui-avatars.com/api/?name=${safeName}&size=400&background=7a3e00&color=fff`;
}

function ChefProfilePage() {
  const { id } = useParams();

  const [chef, setChef] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Fetch the chef and their recipes in parallel - faster than
    // sequential and reduces total time-to-first-render.
    Promise.all([
      apiFetch(`/chefs/${id}`),
      apiFetch(`/recipes/chef/${id}`)
    ])
      .then(([chefData, recipesData]) => {
        setChef(chefData);
        setRecipes(recipesData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="empty">Loading profile…</p>;
  if (error) {
    return (
      <>
        <p className="error-text">Error: {error}</p>
        <Link to="/chefs" className="btn btn--secondary">
          Back to Chefs
        </Link>
      </>
    );
  }
  if (!chef) return null;

  return (
    <>
      <div className="card">
        <div className="profile-header">
          <img
            className="profile-avatar"
            src={chef.profileImageUrl || fallbackAvatar(chef.fullName)}
            alt={chef.fullName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackAvatar(chef.fullName);
            }}
          />
          <div className="profile-info">
            <h1>{chef.fullName}</h1>
            <p className="specialty">{chef.specialty}</p>
            <p className="bio">{chef.bio}</p>
            <p className="email">{chef.email}</p>
          </div>
        </div>
      </div>

      <h2 className="h2" style={{ marginTop: 30 }}>
        Recipes by {chef.fullName}
      </h2>

      {recipes.length === 0 ? (
        <p className="empty">
          {chef.fullName} hasn&rsquo;t published any recipes yet.
        </p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}

      <Link
        to="/chefs"
        className="btn btn--secondary"
        style={{ marginTop: 16 }}
      >
        ← Back to all Chefs
      </Link>
    </>
  );
}

export default ChefProfilePage;
