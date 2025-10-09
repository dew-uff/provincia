import { type IAuthRepository } from '../repositories/IAuthRepository';
import type { LoginCredentials, AuthResponse } from '../../shared/types/auth';

export class LoginUseCase {
    private authRepository: IAuthRepository;
    
    constructor(authRepository: IAuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(credentials: LoginCredentials): Promise<AuthResponse> {
        // Validações básicas
        if (!credentials.email || !credentials.password) {
            throw new Error('Email e senha são obrigatórios');
        }

        // Delega para o repository
        return await this.authRepository.login(credentials);
    }
}