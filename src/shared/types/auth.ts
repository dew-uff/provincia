import { createContext } from 'react';

export interface User {
    id: string;
    nome: string;
    email: string;
    role?: 'admin' | 'user';
}

export interface AuthToken {
    token: string;
    expiresIn: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: AuthToken;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);