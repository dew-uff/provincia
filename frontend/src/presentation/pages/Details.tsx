import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { type DataflowDetails } from '../../shared/types/dashboard';
import Loader from '../components/Loader';
import Table from '../components/Table';
import FilterBar from '../components/FilterBar';
import { type ActiveFilter } from '../components/ActiveFilters';

const dataflowRepository = new MockDataflowRepository();

type TabType = 'executions' | 'datasets' | 'dependencies';

const EXECUTION_STATUS_OPTIONS = [
    { label: 'Todos os status', value: 'all' },
    { label: 'OK', value: 'ok' },
    { label: 'Alerta', value: 'alerta' },
    { label: 'Erro', value: 'erro' }
];

const executionsColNames = ['Timestamp', 'Usuário', 'Duração', 'Tasks', 'Status'];
const executionsColumns = [
    { key: 'timestamp', type: 'text' as const },
    { key: 'user', type: 'text' as const },
    { key: 'duration', type: 'text' as const },
    { key: 'tasks', type: 'text' as const },
    { key: 'status', type: 'status' as const },
];

const datasetsColNames = ['Nome', 'Registros', 'Tamanho', 'Criado em'];
const datasetsColumns = [
    { key: 'name', type: 'text' as const },
    { key: 'records', type: 'text' as const },
    { key: 'size', type: 'text' as const },
    { key: 'created', type: 'text' as const },
];

const getStatusConfig = (status: string) => {
    switch (status) {
        case 'ok':
            return {
                bgColor: 'bg-green-100',
                textColor: 'text-green-800',
                dotColor: 'bg-green-500',
                label: 'OK'
            };
        case 'alerta':
            return {
                bgColor: 'bg-amber-100',
                textColor: 'text-amber-800',
                dotColor: 'bg-amber-500',
                label: 'Alerta'
            };
        case 'erro':
            return {
                bgColor: 'bg-red-100',
                textColor: 'text-red-800',
                dotColor: 'bg-red-500',
                label: 'Erro'
            };
        default:
            return {
                bgColor: 'bg-gray-100',
                textColor: 'text-gray-800',
                dotColor: 'bg-gray-500',
                label: status
            };
    }
};

function Details() {
    const { id } = useParams<{ id: string }>();
    const [dataflow, setDataflow] = useState<DataflowDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<TabType>('executions');
    const [executionSearchTerm, setExecutionSearchTerm] = useState<string>('');
    const [executionStatusFilter, setExecutionStatusFilter] = useState<string>('all');

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                if (id) {
                    const data = await dataflowRepository.getDataflowById(id);
                    setDataflow(data);
                }
            } catch (error) {
                console.error('Erro ao carregar dataflows:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (!dataflow) {
        return (
            <div className='flex flex-col items-center p-6 w-full h-full'>
                <div className='container w-full max-w-[900px]'>
                    <h1 className='text-2xl font-bold text-gray-900'>Dataflow não encontrado</h1>
                </div>
            </div>
        );
    }

    const statusConfig = getStatusConfig(dataflow.status);

    // Filtragem das execuções
    const filteredExecutions = dataflow.recentExecutions
        .map(exec => ({
            ...exec,
            status: exec.status === 'warning' ? 'alerta' : exec.status === 'error' ? 'erro' : exec.status
        }))
        .filter(exec => {
            const statusMatch = executionStatusFilter === 'all' || exec.status === executionStatusFilter;
            const searchLower = executionSearchTerm.toLowerCase();
            const searchMatch = executionSearchTerm === '' ||
                exec.timestamp.toLowerCase().includes(searchLower) ||
                exec.user.toLowerCase().includes(searchLower) ||
                exec.duration.toLowerCase().includes(searchLower) ||
                exec.tasks.toLowerCase().includes(searchLower);
            return statusMatch && searchMatch;
        });

    // Filtros ativos para execuções
    const getStatusLabel = (value: string) => {
        const option = EXECUTION_STATUS_OPTIONS.find(opt => opt.value === value);
        return option?.label || value;
    };

    const executionActiveFilters: ActiveFilter[] = [];

    if (executionSearchTerm) {
        executionActiveFilters.push({
            id: 'search',
            label: 'Busca',
            value: executionSearchTerm,
            onRemove: () => setExecutionSearchTerm('')
        });
    }

    if (executionStatusFilter !== 'all') {
        executionActiveFilters.push({
            id: 'status',
            label: 'Status',
            value: getStatusLabel(executionStatusFilter),
            onRemove: () => setExecutionStatusFilter('all')
        });
    }

    const handleClearExecutionFilters = () => {
        setExecutionSearchTerm('');
        setExecutionStatusFilter('all');
    };

    return (
        <div className='flex flex-col items-center p-6 w-full h-full'>
            <div className='container w-full max-w-[900px]'>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center">
                                <h2 className="text-2xl font-bold text-gray-900">{dataflow.name}</h2>
                                <span className={`ml-4 px-3 py-1 ${statusConfig.bgColor} ${statusConfig.textColor} text-sm font-medium rounded-full flex items-center`}>
                                    <span className={`w-2 h-2 ${statusConfig.dotColor} rounded-full mr-2`}></span>
                                    {statusConfig.label}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{dataflow.description}</p>

                            <div className="mt-4 flex items-center space-x-6 text-sm">
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Criado por <strong>{dataflow.user}</strong></span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Criado em <strong>{dataflow.created}</strong></span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Última execução <strong>{dataflow.lastExecution}</strong></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                                Ver Grafo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Versão</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{dataflow.version}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Agendamento</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{dataflow.schedule}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Duração Média</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{dataflow.avgDuration}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Taxa de Sucesso</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{dataflow.successRate}%</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('executions')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 cursor-pointer ${
                                    activeTab === 'executions'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Execuções
                            </button>
                            <button
                                onClick={() => setActiveTab('datasets')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 cursor-pointer ${
                                    activeTab === 'datasets'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Datasets
                            </button>
                            <button
                                onClick={() => setActiveTab('dependencies')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 cursor-pointer ${
                                    activeTab === 'dependencies'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Dependências
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'executions' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Execuções Recentes</h3>

                                <FilterBar
                                    search={{
                                        value: executionSearchTerm,
                                        onChange: setExecutionSearchTerm,
                                        placeholder: "Buscar execuções...",
                                        flex: 2
                                    }}
                                    dropdowns={[
                                        {
                                            id: 'status',
                                            options: EXECUTION_STATUS_OPTIONS,
                                            value: executionStatusFilter,
                                            onChange: setExecutionStatusFilter,
                                            flex: 1
                                        }
                                    ]}
                                    activeFilters={executionActiveFilters}
                                    onClearAll={handleClearExecutionFilters}
                                />

                                <Table
                                    colNames={executionsColNames}
                                    columns={executionsColumns}
                                    data={filteredExecutions}
                                />
                            </div>
                        )}

                        {activeTab === 'datasets' && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Datasets Gerados</h3>
                                    <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        Exportar Lista
                                    </button>
                                </div>

                                <Table
                                    colNames={datasetsColNames}
                                    columns={datasetsColumns}
                                    data={dataflow.datasets.map(ds => ({
                                        ...ds,
                                        records: ds.records.toLocaleString()
                                    }))}
                                />
                            </div>
                        )}

                        {activeTab === 'dependencies' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataflows Upstream</h3>
                                    {dataflow.upstreamDependencies.length > 0 ? (
                                        <div className="space-y-3">
                                            {dataflow.upstreamDependencies.map((dep) => (
                                                <div key={dep.id} className="bg-gray-50 rounded-lg p-4">
                                                    <p className="text-sm font-medium text-gray-900">{dep.name}</p>
                                                    <p className="text-xs text-gray-600 mt-1">{dep.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                                            <p className="text-sm text-gray-600">Nenhuma dependência upstream</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataflows Downstream</h3>
                                    {dataflow.downstreamDependencies.length > 0 ? (
                                        <div className="space-y-3">
                                            {dataflow.downstreamDependencies.map((dep) => (
                                                <div key={dep.id} className="bg-gray-50 rounded-lg p-4">
                                                    <p className="text-sm font-medium text-gray-900">{dep.name}</p>
                                                    <p className="text-xs text-gray-600 mt-1">{dep.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                                            <p className="text-sm text-gray-600">Nenhuma dependência downstream</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
