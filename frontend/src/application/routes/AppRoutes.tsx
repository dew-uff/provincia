import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import Main from '../../presentation/pages/Main';
import Login from '../../presentation/pages/Login';
import Dashboard from '../../presentation/pages/Dashboard';

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Rota pública */}
            <Route path="/" element={<Login />} />

            {/* Rota protegida */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Main />
                    </PrivateRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};