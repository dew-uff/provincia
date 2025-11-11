import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    logoSrc?: string;
    logoAlt?: string;
}

const Header: React.FC<HeaderProps> = () => {
    const location = useLocation();

    const getLinkClassName = (path: string) => {
        return location.pathname === path
            ? 'text-[#2563EB] font-[500] transition-colors duration-300'
            : 'text-[#6B7280] font-[500] transition-colors duration-300';
    };

    return (
        <header>
            <div className='bg-white flex flex-row justify-between items-center px-4 py-8 border-b border-gray-200'>
                <div>
                    <p className='text-[20px] font-bold text-[#2563EB]'>ProvInCia</p>
                </div>
                <nav className='flex flex-row gap-8'>
                    <Link to="/dashboard" className={getLinkClassName('/dashboard')}>Dashboard</Link>
                    <Link to="/dataflows" className={getLinkClassName('/dataflows')}>Dataflows</Link>
                    <Link to="/consultas" className={getLinkClassName('/consultas')}>Consultas</Link>
                    <Link to="/upload" className={getLinkClassName('/upload')}>Upload</Link>
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