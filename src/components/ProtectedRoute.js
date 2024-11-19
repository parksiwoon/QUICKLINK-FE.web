// components/ProtectedRoute.js
import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, isPending } = useAuth();

  if (isPending) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 내용
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
