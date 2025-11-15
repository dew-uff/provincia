import React from 'react';
import Button from './Button';

interface EmptyStateProps {
    title?: string;
    message?: string;
    showClearButton?: boolean;
    onClearFilters?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'Nenhum resultado encontrado',
    message = 'Não encontramos nenhum dataflow com os filtros selecionados.',
    showClearButton = true,
    onClearFilters,
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h3>

            <p className="text-gray-600 text-center max-w-md mb-6">
                {message}
            </p>

            {showClearButton && onClearFilters && (
                <Button
                    type="button"
                    onClick={onClearFilters}
                    className="px-6 py-2.5"
                >
                    Limpar Filtros
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
