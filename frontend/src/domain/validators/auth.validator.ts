import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .toLowerCase(),
  
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
});

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .toLowerCase(),
  
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'Pelo menos um caractere especial'),
  
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CadastroInput = z.infer<typeof signinSchema>;