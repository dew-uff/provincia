import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
    <div className='flex flex-col w-[100%]'>
        {label && <label className='mb-2 font-medium text-[0.875rem] text-[#1F2937]' htmlFor={props.id}>{label}</label>}
        <input 
            {...props} 
            className='border-2 border-gray-200 p-2 transition-border duration-300 ease-in-out focus:border-[#2563EB] focus:outline-none rounded-md mb-4 w-[100%]' 
            id={label?.toLowerCase() === 'senha:' ? 'password' : 'text'}
            type={label?.toLowerCase() === 'senha:' ? 'password' : 'text'}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
        />
    </div>
);

export default FormInput;