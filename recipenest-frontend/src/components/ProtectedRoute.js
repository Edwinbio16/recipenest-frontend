// ProtectedRoute.js
//
// Wraps a route's element so that unauthenticated visitors are
// bounced to /login instead of seeing the protected content. Used
// only by the dashboard route at present.

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

function ProtectedRoute({ children }) {
  const { currentChef } = useAuth();
  const location = useLocation();

  if (!currentChef) {
    // Pass the current path through in state so LoginPage can
    // bounce back to it after a successful login.
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
