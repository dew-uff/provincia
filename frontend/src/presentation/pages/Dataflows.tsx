import { useEffect, useState } from 'react';

import PageTitle from '../components/PageTitle';
import Table from '../components/Table';
import SearchBar from '../components/dataflows/SearchBar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';

import { type Dataflow, type TimePeriodValue, type PeriodOption } from '../../shared/types/dashboard';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { DATAFLOW_STATUS_OPTIONS } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import TimePeriodDropdown from '../components/TimePeriodDropdown';

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
    const currentYear = new Date().getFullYear();
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    return new Date(currentYear, month - 1, day, hours, minutes);
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
            // Data muito antiga para incluir todos os registros
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

        // Filtro por período
        const dateRange = getDateRangeFromPeriod(selectedPeriod);
        const executionDate = parseLastExecutionDate(dataflow.lastExecution);
        const periodMatch = executionDate >= dateRange.start && executionDate <= dateRange.end;

        return statusMatch && searchMatch && periodMatch;
    });

    // Cálculos de paginação
    const totalPages = Math.ceil(filteredDataFlows.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedDataFlows = filteredDataFlows.slice(startIndex, endIndex);

    // Reset para página 1 quando os filtros mudarem
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStatus, searchTerm, selectedPeriod]);

    // Função para limpar todos os filtros
    const handleClearFilters = () => {
        setSelectedStatus('all');
        setSearchTerm('');
        setSelectedPeriod({
            type: 'preset',
            period: 'all'
        });
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <main className='flex flex-col items-center p-6 w-full h-full'>
                <div className='container w-full max-w-[900px] flex flex-row align-middle justify-center'>
                    <p>Carregando...</p>
                </div>
            </main>
        );
    }

    /**TODO:
     * - Implements actions (view and download)
     */

    return (
        <main className='flex flex-col items-center p-6 w-full h-full'>
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
                    <div className='w-full flex flex-row items-center bg-white rounded-xl shadow-sm gap-4 px-6 py-4'>
                        <div className='flex-[2]'>
                            <SearchBar value={searchTerm} onChange={setSearchTerm} />
                        </div>
                        <div className="flex-1">
                            <Dropdown
                                options={DATAFLOW_STATUS_OPTIONS}
                                value={selectedStatus}
                                onChange={(value) => {
                                    setSelectedStatus(value);
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <TimePeriodDropdown
                                options={PERIOD_OPTIONS}
                                value={selectedPeriod}
                                onChange={setSelectedPeriod}
                                placeholder="Selecione o período"
                            />
                        </div>
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
        </main>
    );
}

export default Dataflows;