// presentation/pages/Login.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import type { LocationState } from '../../shared/types/auth';
import { loginSchema, type LoginInput } from '../../domain/validators';
import { useAuth } from '../../application/hooks/useAuth';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as LocationState)?.from?.pathname || '/dashboard';

    // MUDANÇA 1: Substituir useState por useForm do React Hook Form
    // PORQUE: useForm gerencia o estado do formulário de forma mais eficiente,
    // integra validação automaticamente e reduz re-renders desnecessários
    const {
        register,           // Função para registrar inputs
        handleSubmit,       // Wrapper para onSubmit com validação automática
        formState: { 
            errors,         // Erros de validação do Zod
            isSubmitting    // Estado de submissão (substitui isLoading)
        },
        setError: setFormError  // Para erros customizados (ex: erro da API)
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),  // MUDANÇA 2: Integra Zod para validação
        mode: 'onChange'  // MUDANÇA 3: Valida enquanto digita (melhor UX)
    });

    // MUDANÇA 4: Função onSubmit recebe dados já validados
    // PORQUE: O Zod já validou antes de chamar esta função,
    // garantindo que 'data' está no formato correto (LoginInput)
    const onSubmit = async (data: LoginInput) => {
        try {
            await login(data);  // MUDANÇA 5: Passa objeto completo validado
            navigate(from, { replace: true });
        } catch (err: unknown) {
            // MUDANÇA 6: Usa setError do React Hook Form para erros da API
            // PORQUE: Mantém consistência no gerenciamento de erros
            setFormError('root', {
                message: err instanceof Error ? err.message : 'Erro ao fazer login'
            });
        }
    };

    // REMOVIDO: useEffect com console.log de validação
    // PORQUE: Zod já faz a validação automaticamente

    return (
        <div className="login-page w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
            <div className='bg-white p-12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-105 flex flex-col items-center'>
                <h2 className='text-[#2563EB] mb-2 text-3xl font-bold'>ProvInCia</h2>
                <p className='text-[#6B7280] text-[0.875rem] mb-9'>Provenance in Smart Cities</p>

                {/* MUDANÇA 7: Exibe erro da API (root error) */}
                {/* PORQUE: Erros de validação vão para cada campo, 
                    erros da API vão para 'root' */}
                {errors.root && (
                    <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {errors.root.message}
                    </div>
                )}

                {/* MUDANÇA 8: handleSubmit envolve onSubmit */}
                {/* PORQUE: Valida com Zod antes de chamar onSubmit */}
                <form onSubmit={handleSubmit(onSubmit)} className='w-[100%]'>
                    
                    {/* MUDANÇA 9: Usa {...register('email')} */}
                    {/* PORQUE: Registra o campo no React Hook Form,
                        conecta value/onChange automaticamente */}
                    <FormInput 
                        label="Email"
                        type="email" 
                        id="email"
                        {...register('email')}  // Substitui value e onChange
                        validator={!!errors.email}  // MUDANÇA 10: Usa erro do Zod
                        message={errors.email?.message || 'E-mail inválido ou não cadastrado.'}
                        required
                    />

                    <FormInput
                        label="Senha"
                        type="password"
                        id="password"
                        {...register('senha')}  // MUDANÇA 11: Nome do campo = nome no schema
                        validator={!!errors.senha}  // Mostra erro se existir
                        message={errors.senha?.message}  // Mensagem do Zod
                        required
                    />

                    {/* MUDANÇA 12: Validação automática desabilita botão */}
                    {/* PORQUE: React Hook Form sabe se o form é válido */}
                    <Button 
                        type="submit"
                        disabled={isSubmitting}  // MUDANÇA 13: Usa isSubmitting do form
                        className="w-full mt-2"
                    >
                        {isSubmitting ? (
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
                <p className='mt-7 text-sm text-[#6B7280]'>
                    Não possui conta? <a href="#" className='text-[#2563EB]'>Ver documentação</a>
                </p>
            </div>
        </div>
    );
}

export default Login;