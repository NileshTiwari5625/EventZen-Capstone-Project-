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
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to={user.profileCompleted ? "/venues" : "/profile"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
