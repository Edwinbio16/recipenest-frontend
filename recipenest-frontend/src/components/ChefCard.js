// ChefCard.js
//
// Reusable card that previews a single chef. Used on the Chefs List
// page (in a grid). Clicking the "View Profile" button takes the user
// to the corresponding profile page.

import { Link } from "react-router-dom";

// Fallback avatar shown if the chef's ProfileImageUrl is missing or
// fails to load. Generates a coloured initials avatar from the chef's
// name so something sensible always appears.
function fallbackAvatar(name) {
  const safeName = encodeURIComponent(name || "Chef");
  return `https://ui-avatars.com/api/?name=${safeName}&size=300&background=7a3e00&color=fff`;
}

function ChefCard({ chef }) {
  // onError lets us swap in the fallback if the original image URL 404s.
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackAvatar(chef.fullName);
  };

  return (
    <div className="card chef-card">
      <img
        className="chef-card__avatar"
        src={chef.profileImageUrl || fallbackAvatar(chef.fullName)}
        alt={chef.fullName}
        onError={handleImgError}
      />
      <h3 className="chef-card__name">{chef.fullName}</h3>
      <p className="chef-card__specialty">{chef.specialty}</p>
      <p className="chef-card__bio">{chef.bio}</p>
      <Link to={`/chefs/${chef.id}`} className="btn btn--primary">
        View Profile
      </Link>
    </div>
  );
}

export default ChefCard;
