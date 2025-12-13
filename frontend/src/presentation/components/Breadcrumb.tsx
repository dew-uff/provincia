import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

const routeMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dataflows': 'Dataflows',
    '/consultas': 'Consultas',
    '/upload': 'Upload',
};

const Breadcrumb: React.FC = () => {
    const location = useLocation();

    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const currentPath = location.pathname;
        const breadcrumbs: BreadcrumbItem[] = [];

        // Para páginas de mesmo nível (Dashboard, Dataflows, Consultas, Upload),
        // mostra apenas a página atual, sem hierarquia
        if (routeMap[currentPath]) {
            breadcrumbs.push({
                label: routeMap[currentPath],
                path: currentPath
            });
        }

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    return (
        <nav className="flex items-center gap-2 text-sm pl-3 py-2 bg-white" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const isFirst = index === 0;

                return (
                    <React.Fragment key={item.path || item.label}>
                        {!isFirst && (
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-[#9CA3AF] text-xs"
                            />
                        )}
                        {isLast ? (
                            <span className="text-[#6B7280] font-medium">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.path || '/'}
                                className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
