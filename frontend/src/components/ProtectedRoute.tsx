import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

export default function ProtectedRoute() {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user || user.role !== "admin") return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
