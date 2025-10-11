import { type IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { type User, type LoginCredentials, type AuthResponse } from '../../../shared/types/auth';
import { LocalStorageService } from '../LocalStorageService';

// ⬇️ CREDENCIAIS ESTÁTICAS
const VALID_EMAIL = 'email@email.com.br';
const VALID_PASSWORD = '1234';

// ⬇️ DADOS MOCKADOS DO USUÁRIO
const MOCK_USER: User = {
    id: '1',
    nome: 'Usuário Teste',
    email: VALID_EMAIL,
    role: 'user',
};

export class MockAuthRepository implements IAuthRepository {
    
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // Simula delay de rede (opcional - mais realista)
        await this.simulateDelay(800);

        // ⬇️ VALIDAÇÃO CONTRA CREDENCIAIS ESTÁTICAS
        if (
            credentials.email === VALID_EMAIL && 
            credentials.password === VALID_PASSWORD
        ) {
            // Gera um token fake (apenas para exemplo)
            const token = {
                token: this.generateFakeToken(),
                expiresIn: '7d',
            };

            // Salva no localStorage
            LocalStorageService.saveAuth(MOCK_USER, token);

            return {
                user: MOCK_USER,
                token,
            };
        } else {
            // Credenciais inválidas
            throw new Error('Email ou senha incorretos');
        }
    }

    async logout(): Promise<void> {
        await this.simulateDelay(300);
        LocalStorageService.clearAuth();
    }

    async getCurrentUser(): Promise<User | null> {
        await this.simulateDelay(200);
        return LocalStorageService.getUser();
    }

    isAuthenticated(): boolean {
        return LocalStorageService.isAuthenticated();
    }

    // ⬇️ HELPERS PRIVADOS

    private async simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private generateFakeToken(): string {
        // Gera um token fake para exemplo
        return `fake-jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}