import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../components/admin/AdminDashboardComponents";

export default function AdminDashboard() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream"><p>Loading Dashboard...</p></div>;

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <DashboardLayout />;
}
