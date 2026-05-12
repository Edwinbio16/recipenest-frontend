// RecipeCard.js
//
// Reusable card that displays the full details of a single recipe.
// Used on the Recipes page, the chef profile page, and the dashboard.
// The optional onEdit and onDelete props determine whether the action
// buttons are rendered (only the dashboard passes them in).

function RecipeCard({ recipe, chefName, onEdit, onDelete }) {
  return (
    <div className="card recipe-card">
      <h3>{recipe.title}</h3>
      <p>
        <span className="label-inline">Description:</span> {recipe.description}
      </p>
      <p>
        <span className="label-inline">Ingredients:</span> {recipe.ingredients}
      </p>
      <p>
        <span className="label-inline">Instructions:</span>{" "}
        {recipe.instructions}
      </p>
      <p>
        <span className="label-inline">Category:</span> {recipe.category}
      </p>
      {chefName && (
        <p>
          <span className="label-inline">Chef:</span> {chefName}
        </p>
      )}

      {/* Action buttons are only rendered when this card is being used
          inside an "owner" context (the dashboard). */}
      {(onEdit || onDelete) && (
        <div className="recipe-actions">
          {onEdit && (
            <button className="btn btn--edit" onClick={() => onEdit(recipe)}>
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="btn btn--delete"
              onClick={() => onDelete(recipe.id)}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
