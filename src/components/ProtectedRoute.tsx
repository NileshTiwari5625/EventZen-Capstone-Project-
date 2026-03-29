import { Navigate } from "react-router-dom";
import { authService } from "@/services/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "customer";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/venues"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
