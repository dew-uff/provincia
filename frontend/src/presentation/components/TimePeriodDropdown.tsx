import React, { useState, useRef, useEffect } from 'react';
import { type PeriodOption, type DateRange, type TimePeriodValue } from '../../shared/types/dashboard';

interface TimePeriodDropdownProps {
    options: PeriodOption[];
    value: TimePeriodValue;
    onChange: (value: TimePeriodValue) => void;
    placeholder?: string;
    disabled?: boolean;
    containerClassName?: string;
}

// Função helper para converter data ISO (YYYY-MM-DD) para Date local sem problemas de timezone
const parseISODateLocal = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

const TimePeriodDropdown: React.FC<TimePeriodDropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Selecione o período',
    disabled = false,
    containerClassName = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange>(
        value.dateRange || { startDate: '', endDate: '' }
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Determina o label a ser exibido no botão
    const getDisplayLabel = () => {
        if (value.type === 'custom' && value.dateRange) {
            const start = parseISODateLocal(value.dateRange.startDate).toLocaleDateString('pt-BR');
            const end = parseISODateLocal(value.dateRange.endDate).toLocaleDateString('pt-BR');
            return `${start} - ${end}`;
        }
        const selectedOption = options.find(opt => opt.value === value.period);
        return selectedOption?.label || placeholder;
    };

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePresetSelect = (selectedPeriod: string) => {
        onChange({
            type: 'preset',
            period: selectedPeriod,
        });
        setIsOpen(false);
    };

    const handleDateChange = (field: 'startDate' | 'endDate', newValue: string) => {
        const updatedRange: DateRange = {
            ...dateRange,
            [field]: newValue,
        };

        setDateRange(updatedRange);

        // Só atualiza o onChange se ambas as datas estiverem preenchidas
        if (updatedRange.startDate && updatedRange.endDate) {
            onChange({
                type: 'custom',
                period: 'custom',
                dateRange: updatedRange,
            });
        }
    };

    return (
        <div ref={dropdownRef} className={`relative ${containerClassName}`}>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
                    w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg
                    hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent flex items-center justify-between
                    ${isOpen ? 'ring-2 ring-blue-500' : ''}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <span>{getDisplayLabel()}</span>
                <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                    {/* Opções preset */}
                    <div className="max-h-60 overflow-auto">
                        {options.map((option) => {
                            const isSelected = value.type === 'preset' && option.value === value.period;
                            return (
                                <div
                                    key={option.value}
                                    onClick={() => handlePresetSelect(option.value)}
                                    className={`
                                        px-4 py-2 cursor-pointer hover:bg-gray-100
                                        ${isSelected ? 'bg-blue-50 text-blue-600 font-medium' : ''}
                                    `}
                                >
                                    <span>{option.label}</span>
                                    {isSelected && (
                                        <svg
                                            className="w-5 h-5 inline-block ml-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Divisor */}
                    <div className="border-t border-gray-200"></div>

                    {/* Seção de Período Customizado */}
                    <div className="p-4 bg-gray-50">
                        <div className="text-xs font-semibold text-gray-700 mb-3 uppercase">
                            Período Customizado
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="startDate" className="text-xs font-medium text-gray-600">
                                    Data de Início
                                </label>
                                <input
                                    id="startDate"
                                    type="date"
                                    value={dateRange.startDate}
                                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    disabled={disabled}
                                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="endDate" className="text-xs font-medium text-gray-600">
                                    Data de Fim
                                </label>
                                <input
                                    id="endDate"
                                    type="date"
                                    value={dateRange.endDate}
                                    onChange={(e) => handleDateChange('endDate', e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    disabled={disabled}
                                    min={dateRange.startDate}
                                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {dateRange.startDate && dateRange.endDate && (
                                <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md mt-1">
                                    <svg
                                        className="w-4 h-4 text-blue-600 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-xs text-blue-700">
                                        {parseISODateLocal(dateRange.startDate).toLocaleDateString('pt-BR')} até {parseISODateLocal(dateRange.endDate).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimePeriodDropdown;
