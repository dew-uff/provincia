import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = (): (number | string)[] => {
        const pageNumbers: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Se tiver poucas páginas, mostra todas
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Sempre mostra primeira página
            pageNumbers.push(1);

            // Calcula o intervalo de páginas a mostrar
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Ajusta o intervalo se estiver nos extremos
            if (currentPage <= 3) {
                endPage = 4;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            // Adiciona elipse antes se necessário
            if (startPage > 2) {
                pageNumbers.push('...');
            }

            // Adiciona páginas do meio
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Adiciona elipse depois se necessário
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Sempre mostra última página
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {/* Botão Anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                }`}
            >
                Anterior
            </button>

            {/* Números das páginas */}
            <div className="flex gap-1">
                {pageNumbers.map((pageNum, index) => {
                    if (pageNum === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-2 text-gray-500"
                            >
                                ...
                            </span>
                        );
                    }

                    const page = pageNum as number;
                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                isActive
                                    ? 'bg-[#2563EB] text-white shadow-sm'
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Botão Próximo */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                }`}
            >
                Próximo
            </button>
        </div>
    );
};

export default Pagination;
