import { Navigate } from "react-router-dom";
import { authService } from "@/services/api";

interface ProfileCompletionRouteProps {
  children: React.ReactNode;
}

const ProfileCompletionRoute = ({ children }: ProfileCompletionRouteProps) => {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "customer" && !user.profileCompleted) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default ProfileCompletionRoute;
