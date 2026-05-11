import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if(loading) return <h1 className="text-white font-outfit text-center mt-20">Verificando credenciales...</h1>;

    if(!isAuthenticated) return <Navigate to='/login' replace />;

    return <Outlet/>
};

export default ProtectedRoute;