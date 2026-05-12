// ChefsListPage.js
//
// Public page that lists every chef on the platform. Uses the
// shared apiFetch helper so error handling looks the same as the
// rest of the app.

import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import ChefCard from "../components/ChefCard";

function ChefsListPage() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("/chefs")
      .then((data) => {
        setChefs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="h1">Our Chefs</h1>
      <p className="subtitle">
        Meet the talented chefs sharing their recipes on RecipeNest.
      </p>

      {loading && <p className="empty">Loading chefs…</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && chefs.length === 0 && (
        <p className="empty">No chefs found.</p>
      )}

      <div className="card-grid">
        {chefs.map((chef) => (
          <ChefCard key={chef.id} chef={chef} />
        ))}
      </div>
    </>
  );
}

export default ChefsListPage;
