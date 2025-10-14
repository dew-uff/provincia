import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    logoSrc?: string;
    logoAlt?: string;
}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header>
            <div className='bg-white flex flex-row justify-between items-center px-4 py-8 border-b border-gray-200'>
                <div>
                    <p className='text-[20px] font-bold text-[#2563EB]'>ProvInCia</p>
                </div>
                <nav className='flex flex-row gap-8'>
                    <a href="/" className='text-[#6B7280] font-[500]'>Home</a>
                    <a href="/about" className='text-[#6B7280] font-[500]'>Sobre</a>
                    <a href="/services" className='text-[#6B7280] font-[500]'>Serviços</a>
                    <a href="/contact" className='text-[#6B7280] font-[500]'>Contato</a>
                </nav>
                <div className='flex flex-row gap-2 items-center cursor-pointer'>
                    <p>Maria Luzia Falci</p>
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>
        </header>
    );
};

export default Header;