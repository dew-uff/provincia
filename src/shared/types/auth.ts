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