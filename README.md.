# recipenest-frontend

A React single-page frontend for the [RecipeNestAPI](https://github.com/Edwinbio16/RecipeNestAPI) backend. Lets users browse recipes, view chef profiles, log in, and manage their own recipes through an authenticated dashboard.

---

## Features

- **Browse recipes** — view all recipes with chef attribution
- **Chef profiles** — list of all chefs and individual profile pages
- **Authentication** — login flow against the API, with session held in React context
- **Protected dashboard** — logged-in chefs can create, edit, and delete their own recipes
- **Reusable components** — RecipeCard, ChefCard, RecipeForm, Navbar, ProtectedRoute
- **Centralised API client** — single `api.js` wrapper with consistent error handling

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (functional components + hooks) |
| Routing | React Router |
| State | React Context (AuthContext) |
| HTTP | Fetch API (via `api.js` wrapper) |
| Build | Create React App |

---

## Project Structure

```
src/
├── components/
│   ├── ChefCard.js          # Card view for a chef
│   ├── Navbar.js            # Top navigation with auth-aware links
│   ├── ProtectedRoute.js    # Wraps routes that require login
│   ├── RecipeCard.js        # Card view for a recipe
│   └── RecipeForm.js        # Create/edit recipe form
├── pages/
│   ├── HomePage.js          # Landing page
│   ├── RecipesPage.js       # All recipes
│   ├── ChefsListPage.js     # All chefs
│   ├── ChefProfilePage.js   # Single chef + their recipes
│   ├── LoginPage.js         # Email/password login
│   └── DashboardPage.js     # Logged-in chef's own recipes (CRUD)
├── api.js                   # Fetch wrapper with error handling
├── AuthContext.js           # Login state + login/logout functions
├── App.js                   # Routes
└── index.js                 # Entry point
```

---

## Running Locally

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- The [RecipeNestAPI](https://github.com/Edwinbio16/RecipeNestAPI) backend running on `http://localhost:5236`

### Steps

```bash
# Clone the repo
git clone https://github.com/Edwinbio16/recipenest-frontend.git
cd recipenest-frontend

# Install dependencies
npm install

# Start the dev server
npm start
```

The app starts on `http://localhost:3000`. The backend API URL is configured in `src/api.js`.

### Demo Login

Use any of the seeded chefs from the backend to log in:

| Email | Password |
|---|---|
| marco@recipenest.com | marco_pass_2026 |
| amina@recipenest.com | amina_pass_2026 |
| hiro@recipenest.com | hiro_pass_2026 |

---

## Design Notes

- **Centralised fetch wrapper**: All API calls go through `apiFetch()` in `api.js`, which prepends the base URL, sets the JSON Content-Type, throws on non-2xx responses with a useful message, and returns parsed JSON. This means error handling is consistent across every page and the API URL only changes in one place.
- **Auth state via Context**: `AuthContext` holds the logged-in chef and exposes `login()` and `logout()` functions. The session lives in memory for the tab's lifetime.
- **Route protection**: `<ProtectedRoute>` wraps any route that requires login (currently the Dashboard). Unauthenticated users are redirected to `/login`.
- **No build artefacts committed**: `node_modules/` and `build/` are excluded via `.gitignore`. Dependency versions are locked in `package-lock.json`.

---

## Related Repositories

- **[RecipeNestAPI](https://github.com/Edwinbio16/RecipeNestAPI)** — C# / ASP.NET Core REST API that this frontend consumes

---

## Author

Built by **Edwin Owusu** as part of an Information Technology BSc at the University of Bedfordshire.
