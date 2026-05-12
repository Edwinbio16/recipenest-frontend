// RecipeForm.js
//
// Reusable form used on the dashboard for both adding a new recipe
// and editing an existing one. The parent (DashboardPage) owns the
// state and decides what to do on submit, which keeps this
// component purely presentational.

function RecipeForm({
  formData,
  editingId,
  onChange,
  onSubmit,
  onCancel,
  submitting = false
}) {
  const submitLabel = submitting
    ? editingId
      ? "Updating…"
      : "Adding…"
    : editingId
      ? "Update Recipe"
      : "Add Recipe";

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={formData.title}
        onChange={onChange}
        required
        minLength={2}
        maxLength={150}
        className="input"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={onChange}
        maxLength={500}
        className="textarea"
      />

      <textarea
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={formData.ingredients}
        onChange={onChange}
        maxLength={2000}
        className="textarea"
      />

      <textarea
        name="instructions"
        placeholder="Instructions"
        value={formData.instructions}
        onChange={onChange}
        maxLength={5000}
        className="textarea"
      />

      <input
        type="text"
        name="category"
        placeholder="Category (e.g. Dinner, Dessert)"
        value={formData.category}
        onChange={onChange}
        maxLength={50}
        className="input"
      />

      <button
        type="submit"
        className="btn btn--primary"
        disabled={submitting}
      >
        {submitLabel}
      </button>

      {editingId && (
        <button
          type="button"
          onClick={onCancel}
          className="btn btn--secondary"
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default RecipeForm;
