import React from 'react';
import type { ButtonProps } from '../../../types';

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
        className={`p-3 rounded ${className}`}
    >
        {children}
    </button>
);

export default Button;