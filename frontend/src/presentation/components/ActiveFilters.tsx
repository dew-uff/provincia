import React from 'react';

export interface ActiveFilter {
    id: string;
    label: string;
    value: string;
    onRemove: () => void;
}

interface ActiveFiltersProps {
    filters: ActiveFilter[];
    onClearAll?: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onClearAll }) => {
    if (filters.length === 0) return null;

    return (
        <div className="flex items-center gap-2 flex-wrap animate-fadeIn">
            <span className="text-sm font-medium text-gray-600">Filtros ativos:</span>

            {filters.map((filter) => (
                <div
                    key={filter.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200 animate-fadeIn"
                >
                    <span className="font-medium">{filter.label}:</span>
                    <span>{filter.value}</span>
                    <button
                        onClick={filter.onRemove}
                        className="ml-1 hover:bg-blue-100 rounded-full p-0.5 transition-colors duration-200"
                        aria-label={`Remover filtro ${filter.label}`}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            ))}

            {onClearAll && (
                <button
                    onClick={onClearAll}
                    className="text-sm text-gray-600 hover:text-gray-800 underline font-medium transition-colors duration-200"
                >
                    Limpar todos
                </button>
            )}
        </div>
    );
};

export default ActiveFilters;
