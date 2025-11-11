import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Dropdown from '../components/Dropdown';
import MetricsCard from '../components/dashboard/MetricsCard';
import Table from '../components/dashboard/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MockDashboardRepository } from '../../infrastructure/storage/repositories/MockDashboardRepository';
import { type Dataflow, type DashboardMetrics, type PeriodOption } from '../../shared/types/dashboard';

const colNames = ['Nome', 'Usuário', 'Última Execução', 'Status'];

const columns = [
    { key: 'name', type: 'text' as const },
    { key: 'user', type: 'text' as const },
    { key: 'lastExecution', type: 'text' as const },
    { key: 'status', type: 'status' as const }
];

const dashboardRepository = new MockDashboardRepository();

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('option1');
    const [dataFlows, setDataFlows] = useState<Dataflow[]>([]);
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [periodOptions, setPeriodOptions] = useState<PeriodOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                const data = await dashboardRepository.getDashboardData();
                setDataFlows(data.recentDataflows);
                setMetrics(data.metrics);
                setPeriodOptions(data.periodOptions);
            } catch (error) {
                console.error('Erro ao carregar dados do dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <main className='flex flex-col items-center p-6 w-full h-full'>
                <div className='container w-full max-w-[800px] flex flex-row align-middle justify-center'>
                    <p>Carregando...</p>
                </div>
            </main>
        );
    }

    return (
        <main className='flex flex-col items-center p-6 w-full h-full'>
            <div className='container w-full max-w-[800px] flex flex-row align-middle justify-between mb-4'>
                <PageTitle title="Dashboard" />
                <Dropdown
                    options={periodOptions}
                    value={selectedPeriod}
                    onChange={(value) => {
                        setSelectedPeriod(value);
                        console.log(value);
                    }}
                 />
            </div>
            <div className="mt-4.5 container max-w-[800px]">
                <section>
                    <div className='flex flex-row align-middle justify-center gap-6'>
                        <MetricsCard numbers={metrics?.dataflows.toString() || '0'} indicator="Dataflows" />
                        <MetricsCard numbers={metrics?.executions.toLocaleString('pt-BR') || '0'} indicator="Execuções" />
                        <MetricsCard numbers={metrics?.activeUsers.toString() || '0'} indicator="Usuários Ativos" />
                        <MetricsCard numbers={metrics?.datasets.toString() || '0'} indicator="Datasets" />
                    </div>
                </section>
            </div>
            <div className="mt-9 container max-w-[800px]">
                <section>
                    <div className="w-full bg-white rounded-xl p-5">
                        <div className="w-full flex flex-row justify-between items-center">
                            <h2 className="text-[20px] font-semibold text-[#1F2937]">Dataflows Recentes</h2>
                            <a href="#" className="text-[#2563EB] text-sm">
                                Ver todos
                                <FontAwesomeIcon icon={faArrowRight} size='xs'/>
                            </a>
                        </div>
                        <div>
                            <Table colNames={colNames} columns={columns} data={dataFlows} />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Dashboard;