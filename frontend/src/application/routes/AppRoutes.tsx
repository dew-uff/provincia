import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import Main from '../../presentation/pages/Main';
import Login from '../../presentation/pages/Login';
import Dashboard from '../../presentation/pages/Dashboard';
import Dataflows from '../../presentation/pages/Dataflows';
import Search from '../../presentation/pages/Search';
import Upload from '../../presentation/pages/Upload';
import Details from '../../presentation/pages/Details';

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
                <Route path="/dataflows" element={<Dataflows />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/consultas" element={<Search />} />
                <Route path="/upload" element={<Upload />} />
            </Route>

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};