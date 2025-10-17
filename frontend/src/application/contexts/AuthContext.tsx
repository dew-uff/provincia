import { useEffect, type ReactNode, useState } from 'react';
import type { User, LoginCredentials } from '../../shared/types/auth';
import { MockAuthRepository } from '../../infrastructure/storage/repositories/MockAuthRepository';
import { LoginUseCase } from '../../domain/use-cases/LoginUseCase';
import { LogoutUseCase } from '../../domain/use-cases/LogoutUseCase';
import { AuthContext } from '../../shared/types/auth';


const authRepository = new MockAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        verifyAuth();
    }, []);

     const verifyAuth = async () => {
        try {
            if (authRepository.isAuthenticated()) {
                const currentUser = await authRepository.getCurrentUser();
                setUser(currentUser);
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials) => {
        const { user } = await loginUseCase.execute(credentials);
        setUser(user);
    };

    const logout = async () => {
        await logoutUseCase.execute();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}