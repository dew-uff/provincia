import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';

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
        const breadcrumbs: BreadcrumbItem[] = [
            { label: 'Dashboard', path: '/dashboard' }
        ];

        const currentPath = location.pathname;

        if (currentPath !== '/dashboard' && routeMap[currentPath]) {
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
                            <span className="text-[#6B7280] font-medium flex items-center gap-1.5">
                                {isFirst && (
                                    <FontAwesomeIcon
                                        icon={faHome}
                                        className="text-[#6B7280]"
                                    />
                                )}
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.path || '/'}
                                className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors duration-200 flex items-center gap-1.5"
                            >
                                {isFirst && (
                                    <FontAwesomeIcon
                                        icon={faHome}
                                        className="text-[#2563EB]"
                                    />
                                )}
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
