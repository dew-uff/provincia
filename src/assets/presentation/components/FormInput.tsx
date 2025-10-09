import React from 'react';
import type { InputHTMLAttributes } from 'react';


interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    validator?: boolean;
    message?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, validator, message, ...props }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (<div className='flex flex-col w-[100%] mt-2'>
        {label && <label className='mb-2 font-medium text-[0.875rem] text-[#1F2937]' htmlFor={props.id}>{label}</label>}
        <input 
            {...props} 
            className='border-2 border-gray-200 p-2 transition-border duration-300 ease-in-out focus:border-[#2563EB] focus:outline-none rounded-[0.5rem] mb-1 w-[100%]' 
            id={label?.toLowerCase() === 'senha' ? 'password' : 'text'}
            type={label?.toLowerCase() === 'senha' && !showPassword ? 'password' : 'text'}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
        />
        {validator && <span className='text-red-500 text-sm'>{message}</span>}
        {label?.toLowerCase() === 'senha' 
        
        && 
        
        <label className="flex items-center cursor-pointer mt-1 mb-3 group">
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="peer hidden" />
            <span className="w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors duration-200">
                <svg className="w-3 h-3 text-white opacity-0 group-has-[:checked]:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
            </span>
            <span className="ml-2 text-sm">Mostrar senha</span>
        </label>}
    </div>
);
}

export default FormInput;