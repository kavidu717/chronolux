import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedAuthRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
