import { useEffect, useState } from 'react';
import type { LocationState } from '../../shared/types/auth';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { isValidEmail } from '../../shared/utils/validators';
import { useAuth } from '../../application/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';





export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as LocationState)?.from?.pathname || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login({ email, password });
            navigate(from, { replace: true });
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(isValidEmail(email));
    }, [email]);

    return (
        <div className="login-page w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
            <div className='bg-white p-12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-105 flex flex-col items-center'>
                <h2 className='text-[#2563EB] mb-2 text-3xl font-bold'>ProvInCia</h2>
                <p className='text-[#6B7280] text-[0.875rem] mb-9'>Provenance in Smart Cities</p>
                {/* TODO: */}
                    {/* - () Criar rotas de autenticação */}
                {error && (
                    <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className='w-[100%]'>
                    <FormInput 
                        label="Email"
                        type="email" 
                        id="email"
                        value={email}
                        validator={email !== '' && !isValidEmail(email)}
                        message='E-mail inválido ou não cadastrado.'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FormInput
                        label="Senha"
                        type="password"
                        id="password"
                        validator={false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button 
                        type="submit"
                        disabled={!email || !password}
                        className="w-full mt-2"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Entrando...
                            </span>
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </form>
                <a href="#" className='mt-4 text-[#2563EB] text-sm'>Esqueceu a senha?</a>
                <p className='mt-7 text-sm text-[#6B7280]'>Não possui conta? <a href="#" className='text-[#2563EB]'>Ver documentação</a></p>
            </div>
        </div>
    );
}