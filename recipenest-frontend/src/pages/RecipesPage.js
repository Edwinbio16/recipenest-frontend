// RecipesPage.js
//
// Public, read-only listing of every recipe on the platform. The
// chef name for each recipe is resolved by looking it up in the
// chefs list, which is fetched alongside the recipes.

import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import RecipeCard from "../components/RecipeCard";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([apiFetch("/recipes"), apiFetch("/chefs")])
      .then(([recipesData, chefsData]) => {
        setRecipes(recipesData);
        setChefs(chefsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getChefName = (chefId) => {
    const chef = chefs.find((c) => c.id === chefId);
    return chef ? chef.fullName : `Chef #${chefId}`;
  };

  return (
    <>
      <h1 className="h1">All Recipes</h1>
      <p className="subtitle">
        Every recipe published on RecipeNest, from every chef.
      </p>

      {loading && <p className="empty">Loading recipes…</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p className="empty">No recipes have been added yet.</p>
      )}

      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          chefName={getChefName(recipe.chefId)}
        />
      ))}
    </>
  );
}

export default RecipesPage;
