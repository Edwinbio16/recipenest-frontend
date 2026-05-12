// App.js
//
// Root component. Wraps the entire tree in AuthProvider so that
// any page can read the currently logged-in chef from context, and
// configures the routing table. The dashboard is wrapped in a
// ProtectedRoute so anonymous visitors are bounced to /login.

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import ChefsListPage from "./pages/ChefsListPage";
import ChefProfilePage from "./pages/ChefProfilePage";
import RecipesPage from "./pages/RecipesPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="page">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chefs" element={<ChefsListPage />} />
              <Route path="/chefs/:id" element={<ChefProfilePage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
