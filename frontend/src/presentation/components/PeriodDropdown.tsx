import { useState, useRef, useEffect } from 'react';

const PERIOD_OPTIONS = [
    { value: 7, label: 'Últimos 7 dias' },
    { value: 30, label: 'Últimos 30 dias' },
    { value: 90, label: 'Últimos 90 dias' },
    { value: 180, label: 'Últimos 180 dias' },
    { value: 365, label: 'Últimos 365 dias' },
];

type PeriodDropdownProps = {
    onFilterChange: (period: number) => void;
};

export const PeriodDropdown = ({ onFilterChange }: PeriodDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(30);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = PERIOD_OPTIONS.find(opt => opt.value === selectedPeriod)?.label || 'Selecione';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: number) => {
        setSelectedPeriod(value);
        onFilterChange(value);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative inline-block">
            {/* Botão */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-3 min-w-[180px] px-3 py-2 
                           bg-white border border-gray-300 rounded-lg 
                           hover:border-blue-400 hover:shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200"
            >
                <span className="text-sm font-medium text-gray-700">{selectedLabel}</span>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 min-w-[180px] bg-white border border-gray-200 
                                rounded-lg shadow-xl z-50 overflow-hidden
                                animate-in fade-in slide-in-from-top-2 duration-200">
                    {PERIOD_OPTIONS.map((option, index) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full text-left px-4 py-2.5 text-sm 
                                        hover:bg-blue-50 transition-colors duration-150
                                        ${index !== 0 ? 'border-t border-gray-100' : ''}
                                        ${
                                selectedPeriod === option.value
                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                    : 'text-gray-700'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};