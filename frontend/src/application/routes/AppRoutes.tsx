import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import { LoginPage } from '../../presentation/pages/Login';
import Main from '../../presentation/pages/Main';

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
                        <Main />
                    </PrivateRoute>
                }
            />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/auth/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/auth/dashboard" replace />} />
        </Routes>
    );
};