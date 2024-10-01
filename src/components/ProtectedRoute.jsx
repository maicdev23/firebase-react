import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {

    if (!Cookies.get('token')) return <Navigate to="/login" replace />;

    return <Outlet/>;
};

export default ProtectedRoute;