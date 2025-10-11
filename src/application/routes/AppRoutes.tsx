import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

// Pages
import { LoginPage } from '../../presentation/pages/Login';
import Dashboard from '../../presentation/pages/Dashboard';

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Rota pública */}
            <Route path="/" element={<LoginPage />} />

            {/* Rota protegida */}
            <Route
                path="auth/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/auth/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/auth/dashboard" replace />} />
        </Routes>
    );
};