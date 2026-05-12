// DashboardPage.js
//
// The chef dashboard. Lets the logged-in chef edit their own
// profile and manage (add / edit / delete) the recipes they own.
// Authentication is handled by AuthContext - this component
// simply reads currentChef and trusts that ProtectedRoute has
// already redirected anonymous visitors to /login.

import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import { useAuth } from "../AuthContext";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";

const EMPTY_RECIPE = {
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  category: ""
};

function DashboardPage() {
  const { currentChef, updateCurrentChef } = useAuth();

  // ---- profile state ---------------------------------------------------
  const [profile, setProfile] = useState({
    fullName: currentChef?.fullName || "",
    email: currentChef?.email || "",
    bio: currentChef?.bio || "",
    profileImageUrl: currentChef?.profileImageUrl || "",
    specialty: currentChef?.specialty || ""
  });
  const [profileMessage, setProfileMessage] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // ---- recipe state ----------------------------------------------------
  const [recipes, setRecipes] = useState([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [recipesError, setRecipesError] = useState(null);
  const [recipeForm, setRecipeForm] = useState(EMPTY_RECIPE);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [recipeMessage, setRecipeMessage] = useState(null);
  const [recipeSaving, setRecipeSaving] = useState(false);

  // ---- effects --------------------------------------------------------

  // Fetch this chef's recipes whenever the logged-in chef changes.
  // currentChef is guaranteed to exist because the route is protected.
  useEffect(() => {
    if (!currentChef) return;
    setRecipesLoading(true);
    setRecipesError(null);
    apiFetch(`/recipes/chef/${currentChef.id}`)
      .then((data) => {
        setRecipes(data);
        setRecipesLoading(false);
      })
      .catch((err) => {
        setRecipesError(err.message);
        setRecipesLoading(false);
      });
  }, [currentChef]);

  // ---- handlers -------------------------------------------------------

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage(null);
    setProfileSaving(true);
    try {
      await apiFetch(`/chefs/${currentChef.id}`, {
        method: "PUT",
        body: profile
      });
      // Mirror the saved values back into AuthContext so the
      // navbar greeting and any other consumers see the new name
      // immediately.
      updateCurrentChef(profile);
      setProfileMessage({
        type: "success",
        text: "Profile updated successfully."
      });
    } catch (err) {
      setProfileMessage({ type: "error", text: err.message });
    } finally {
      setProfileSaving(false);
    }
  };

  const handleRecipeChange = (e) => {
    setRecipeForm({ ...recipeForm, [e.target.name]: e.target.value });
  };

  // Submit handler for both add and edit. Decides between POST and
  // PUT based on whether editingRecipeId is set.
  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    setRecipeMessage(null);
    setRecipeSaving(true);

    const payload = {
      ...recipeForm,
      id: editingRecipeId || 0,
      chefId: currentChef.id
    };

    try {
      if (editingRecipeId) {
        await apiFetch(`/recipes/${editingRecipeId}`, {
          method: "PUT",
          body: payload
        });
      } else {
        await apiFetch("/recipes", { method: "POST", body: payload });
      }
      // Re-fetch this chef's recipes so the list reflects the change.
      const fresh = await apiFetch(`/recipes/chef/${currentChef.id}`);
      setRecipes(fresh);
      setRecipeForm(EMPTY_RECIPE);
      setEditingRecipeId(null);
      setRecipeMessage({
        type: "success",
        text: editingRecipeId
          ? "Recipe updated successfully."
          : "Recipe added successfully."
      });
    } catch (err) {
      setRecipeMessage({ type: "error", text: err.message });
    } finally {
      setRecipeSaving(false);
    }
  };

  const handleEditRecipe = (recipe) => {
    setRecipeForm({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      category: recipe.category
    });
    setEditingRecipeId(recipe.id);
    setRecipeMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?"))
      return;
    try {
      await apiFetch(`/recipes/${id}`, { method: "DELETE" });
      setRecipes(recipes.filter((r) => r.id !== id));
      setRecipeMessage({ type: "success", text: "Recipe deleted." });
    } catch (err) {
      setRecipeMessage({ type: "error", text: err.message });
    }
  };

  const cancelRecipeEdit = () => {
    setRecipeForm(EMPTY_RECIPE);
    setEditingRecipeId(null);
    setRecipeMessage(null);
  };

  // ---- render ---------------------------------------------------------

  return (
    <>
      <h1 className="h1">Welcome, {currentChef.fullName}</h1>
      <p className="subtitle">
        Manage your profile and recipes from this dashboard.
      </p>

      {/* --- Profile section --- */}
      <section className="dashboard-section">
        <h2 className="h2">My Profile</h2>
        <div className="card">
          <form onSubmit={handleProfileSubmit}>
            <label className="label">Full name</label>
            <input
              className="input"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              required
            />

            <label className="label">Email</label>
            <input
              className="input"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              required
            />

            <label className="label">Specialty</label>
            <input
              className="input"
              name="specialty"
              value={profile.specialty}
              onChange={handleProfileChange}
            />

            <label className="label">Profile image URL</label>
            <input
              className="input"
              name="profileImageUrl"
              type="url"
              value={profile.profileImageUrl}
              onChange={handleProfileChange}
              placeholder="https://..."
            />

            <label className="label">Biography</label>
            <textarea
              className="textarea"
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
            />

            <button
              type="submit"
              className="btn btn--primary"
              disabled={profileSaving}
            >
              {profileSaving ? "Saving…" : "Save profile"}
            </button>

            {profileMessage && (
              <p
                className={
                  profileMessage.type === "success"
                    ? "success-text"
                    : "error-text"
                }
              >
                {profileMessage.text}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* --- Recipe section --- */}
      <section className="dashboard-section">
        <h2 className="h2">My Recipes</h2>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>
            {editingRecipeId ? "Edit Recipe" : "Add a New Recipe"}
          </h3>
          <RecipeForm
            formData={recipeForm}
            editingId={editingRecipeId}
            onChange={handleRecipeChange}
            onSubmit={handleRecipeSubmit}
            onCancel={cancelRecipeEdit}
            submitting={recipeSaving}
          />
          {recipeMessage && (
            <p
              className={
                recipeMessage.type === "success"
                  ? "success-text"
                  : "error-text"
              }
            >
              {recipeMessage.text}
            </p>
          )}
        </div>

        {recipesLoading && <p className="empty">Loading your recipes…</p>}
        {recipesError && <p className="error-text">Error: {recipesError}</p>}
        {!recipesLoading && !recipesError && recipes.length === 0 && (
          <p className="empty">You haven&rsquo;t added any recipes yet.</p>
        )}
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
          />
        ))}
      </section>
    </>
  );
}

export default DashboardPage;
