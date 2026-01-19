import { useEffect, useState } from 'react';

import PageTitle from '../components/PageTitle';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { type ActiveFilter } from '../components/ActiveFilters';
import Loader from '../components/Loader';
import FilterBar from '../components/FilterBar';
import TimePeriodDropdown from '../components/TimePeriodDropdown';
import Button from '../components/Button';

import { type Dataflow, type TimePeriodValue, type PeriodOption } from '../../shared/types/dashboard';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { DATAFLOW_STATUS_OPTIONS } from '../../infrastructure/storage/repositories/MockDataflowRepository';

const colNames = ['ID','Nome', 'Usuário', 'Última Execução', 'Status', 'Ações'];

const columns = [
    { key: 'id', type: 'text' as const },
    { key: 'name', type: 'text' as const },
    { key: 'user', type: 'text' as const },
    { key: 'lastExecution', type: 'text' as const },
    { key: 'status', type: 'status' as const },
    { key: 'actions', type: 'actions' as const }
];

const ITEMS_PER_PAGE = 15;

const PERIOD_OPTIONS: PeriodOption[] = [
    { label: 'Todos os períodos', value: 'all' },
    { label: 'Últimos 7 dias', value: 'last7days' },
    { label: 'Últimos 30 dias', value: 'last30days' },
    { label: 'Últimos 2 meses', value: 'last60days' },
    { label: 'Últimos 3 meses', value: 'last90days' },
    { label: 'Últimos 12 meses', value: 'last365days' }
];

const dataflowRepository = new MockDataflowRepository();

const parseLastExecutionDate = (dateStr: string): Date => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    let parsedDate = new Date(currentYear, month - 1, day, hours, minutes);

    if (parsedDate > now) {
        parsedDate = new Date(currentYear - 1, month - 1, day, hours, minutes);
    }

    return parsedDate;
};

const getDateRangeFromPeriod = (period: TimePeriodValue): { start: Date; end: Date } => {
    const now = new Date();
    const end = now;
    let start = new Date();

    if (period.type === 'custom' && period.dateRange) {
        const [startYear, startMonth, startDay] = period.dateRange.startDate.split('-').map(Number);
        const [endYear, endMonth, endDay] = period.dateRange.endDate.split('-').map(Number);
        start = new Date(startYear, startMonth - 1, startDay, 0, 0, 0);
        return { start, end: new Date(endYear, endMonth - 1, endDay, 23, 59, 59) };
    }

    switch (period.period) {
        case 'all':
            start = new Date(1900, 0, 1);
            break;
        case 'last7days':
            start.setDate(now.getDate() - 7);
            break;
        case 'last30days':
            start.setDate(now.getDate() - 30);
            break;
        case 'last60days':
            start.setDate(now.getDate() - 60);
            break;
        case 'last90days':
            start.setDate(now.getDate() - 90);
            break;
        case 'last365days':
            start.setDate(now.getDate() - 365);
            break;
        default:
            start = new Date(1900, 0, 1);
    }

    return { start, end };
};

function Dataflows() {
    const [dataFlows, setDataFlows] = useState<Dataflow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriodValue>({
        type: 'preset',
        period: 'all'
    });
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const loadDataflows = async () => {
            try {
                setLoading(true);
                const data = await dataflowRepository.getAllDataflows();
                setDataFlows(data);
            } catch (error) {
                console.error('Erro ao carregar dataflows:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDataflows();
    }, []);

    const filteredDataFlows = dataFlows.filter((dataflow) => {
        const statusMatch = selectedStatus === 'all' || dataflow.status === selectedStatus;

        const searchLower = searchTerm.toLowerCase();
        const searchMatch = searchTerm === '' ||
            dataflow.id.toLowerCase().includes(searchLower) ||
            dataflow.name.toLowerCase().includes(searchLower) ||
            dataflow.user.toLowerCase().includes(searchLower) ||
            dataflow.lastExecution.toLowerCase().includes(searchLower) ||
            dataflow.status.toLowerCase().includes(searchLower);

        const dateRange = getDateRangeFromPeriod(selectedPeriod);
        const executionDate = parseLastExecutionDate(dataflow.lastExecution);
        const periodMatch = executionDate >= dateRange.start && executionDate <= dateRange.end;

        return statusMatch && searchMatch && periodMatch;
    });

    const totalPages = Math.ceil(filteredDataFlows.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedDataFlows = filteredDataFlows.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStatus, searchTerm, selectedPeriod]);

    const handleClearFilters = () => {
        setSelectedStatus('all');
        setSearchTerm('');
        setSelectedPeriod({
            type: 'preset',
            period: 'all'
        });
        setCurrentPage(1);
    };

    const getPeriodLabel = (period: TimePeriodValue): string => {
        if (period.type === 'custom' && period.dateRange) {
            const start = new Date(period.dateRange.startDate).toLocaleDateString('pt-BR');
            const end = new Date(period.dateRange.endDate).toLocaleDateString('pt-BR');
            return `${start} - ${end}`;
        }
        const option = PERIOD_OPTIONS.find(opt => opt.value === period.period);
        return option?.label || '';
    };

    const getStatusLabel = (statusValue: string): string => {
        const option = DATAFLOW_STATUS_OPTIONS.find(opt => opt.value === statusValue);
        return option?.label || statusValue;
    };

    const activeFilters: ActiveFilter[] = [];

    if (searchTerm) {
        activeFilters.push({
            id: 'search',
            label: 'Busca',
            value: searchTerm,
            onRemove: () => setSearchTerm('')
        });
    }

    if (selectedStatus !== 'all') {
        activeFilters.push({
            id: 'status',
            label: 'Status',
            value: getStatusLabel(selectedStatus),
            onRemove: () => setSelectedStatus('all')
        });
    }

    if (selectedPeriod.period !== 'all') {
        activeFilters.push({
            id: 'period',
            label: 'Período',
            value: getPeriodLabel(selectedPeriod),
            onRemove: () => setSelectedPeriod({ type: 'preset', period: 'all' })
        });
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='flex flex-col items-center p-6 w-full h-full'>
            <div className='container w-full max-w-[900px] flex flex-row align-middle justify-between'>
                <PageTitle title="Dataflows" />
                <div className='w-full max-w-[120px] flex'>
                    <Button 
                        type="button"
                        onClick={() => console.log("novo dataflow")}
                        className="w-full cursor-pointer align-middle justify-center"
                    >
                        + Novo
                    </Button>
                </div>
            </div>
            <div className="mt-4.5 container max-w-[900px]">
                <section>
                    <div className="bg-white rounded-xl shadow-sm px-6 py-4">
                        <FilterBar
                            search={{
                                value: searchTerm,
                                onChange: setSearchTerm,
                                placeholder: "Buscar dataflows...",
                                flex: 2
                            }}
                            dropdowns={[
                                {
                                    id: 'status',
                                    options: DATAFLOW_STATUS_OPTIONS,
                                    value: selectedStatus,
                                    onChange: setSelectedStatus,
                                    flex: 1
                                }
                            ]}
                            customElements={[
                                {
                                    id: 'period',
                                    element: (
                                        <TimePeriodDropdown
                                            options={PERIOD_OPTIONS}
                                            value={selectedPeriod}
                                            onChange={setSelectedPeriod}
                                            placeholder="Selecione o período"
                                        />
                                    ),
                                    flex: 1
                                }
                            ]}
                            activeFilters={activeFilters}
                            onClearAll={handleClearFilters}
                        />
                    </div>
                </section>
            </div>
            <div className="mt-9 container max-w-[900px]">
                <section>
                    <div className="w-full bg-white rounded-xl">
                        {filteredDataFlows.length === 0 ? (
                            <EmptyState
                                title="Nenhum resultado encontrado"
                                message="Não encontramos nenhum dataflow com os filtros selecionados. Tente ajustar seus critérios de busca."
                                showClearButton={true}
                                onClearFilters={handleClearFilters}
                            />
                        ) : (
                            <>
                                <Table colNames={colNames} columns={columns} data={paginatedDataFlows} />
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dataflows;