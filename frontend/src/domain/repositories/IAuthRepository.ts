import type { User, LoginCredentials, AuthResponse } from '../../shared/types/auth';

export interface IAuthRepository {
    login(credentials: LoginCredentials): Promise<AuthResponse>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
    isAuthenticated(): boolean;
}