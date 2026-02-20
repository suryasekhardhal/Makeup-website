import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, authReady } = useSelector((state) => state.auth);

  if (!authReady) {
    return null; // or loading spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
