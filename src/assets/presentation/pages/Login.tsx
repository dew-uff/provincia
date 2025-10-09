// src/presentation/pages/Auth/LoginPage.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div className="login-page w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
            <div className='bg-white p-12 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-105 flex flex-col items-center'>
                <h2 className='text-[#2563EB] mb-2 text-3xl font-bold'>ProvInCia</h2>
                <p className='text-[#6B7280] text-[0.875rem] mb-9'>Provenance in Smart Cities</p>
                /** TODO:
                    - Componentizar formulário
                        - Criar componentes para cada campo de entrada
                        - Criar componente para o botão
                    - Adicionar validação de campos                
                */
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Senha:</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}