import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { type Dataflow } from '../../shared/types/dashboard';

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

const dataflowRepository = new MockDataflowRepository();

const Breadcrumb: React.FC = () => {
    const location = useLocation();
    const params = useParams<{ id: string }>();
    const [dataflow, setDataflow] = useState<Dataflow | null>(null);

    useEffect(() => {
        const loadDataflow = async () => {
            const detailsMatch = location.pathname.match(/^\/details\/(.+)$/);

            if (detailsMatch && params.id) {
                try {
                    const data = await dataflowRepository.getDataflowById(params.id);
                    setDataflow(data);
                } catch (error) {
                    console.error('Erro ao carregar dataflow:', error);
                }
            } else {
                setDataflow(null);
            }
        };

        loadDataflow();
    }, [location.pathname, params.id]);

    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const currentPath = location.pathname;
        const breadcrumbs: BreadcrumbItem[] = [];

        // Verifica se é uma rota de detalhes
        const detailsMatch = currentPath.match(/^\/details\/(.+)$/);
        if (detailsMatch && dataflow) {
            breadcrumbs.push({
                label: 'Dataflows',
                path: '/dataflows'
            });
            breadcrumbs.push({
                label: dataflow.name,
                path: currentPath
            });
            return breadcrumbs;
        }

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
