import React from 'react';
import type { ButtonProps } from '../../shared/types/ui-elements';

const Button: React.FC<ButtonProps> = ({
    type = 'submit',
    disabled = false,
    onClick,
    children = '',
    className = {},
}) => (
    <button 
        type={type} 
        disabled={disabled} 
        onClick={onClick}
        className={`p-3 rounded-[0.5rem] ${className} bg-[#2563EB] text-white text-[1rem] font-semibold hover:bg-[#1D4ED8] transition-colors duration-300 cursor-pointer`}
    >
        {children}
    </button>
);

export default Button;