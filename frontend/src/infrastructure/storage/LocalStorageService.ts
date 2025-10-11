import { type User, type AuthToken } from '../../shared/types/auth';

export class LocalStorageService {
    private static readonly KEYS = {
        USER: '@app:user',
        TOKEN: '@app:token',
    };

    static saveAuth(user: User, token: AuthToken): void {
        try {
            localStorage.setItem(this.KEYS.USER, JSON.stringify(user));
            localStorage.setItem(this.KEYS.TOKEN, token.token);
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
        }
    }

    static getUser(): User | null {
        try {
            const userStr = localStorage.getItem(this.KEYS.USER);
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Erro ao ler usuário do localStorage:', error);
            return null;
        }
    }

    static getToken(): string | null {
        return localStorage.getItem(this.KEYS.TOKEN);
    }

    static clearAuth(): void {
        localStorage.removeItem(this.KEYS.USER);
        localStorage.removeItem(this.KEYS.TOKEN);
    }

    static isAuthenticated(): boolean {
        return !!(this.getToken() && this.getUser());
    }
}