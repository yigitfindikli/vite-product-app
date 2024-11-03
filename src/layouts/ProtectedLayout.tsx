import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '@/components/Header/Header';

const ProtectedLayout = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="layout" data-testid="protected-layout">
            <Header />
            <Outlet />
        </div>
    );
};

export default ProtectedLayout;
