import React, { useState, useEffect, useMemo } from 'react';
import PageTitle from '../components/PageTitle';
import TimePeriodDropdown from '../components/TimePeriodDropdown';
import MetricsCard from '../components/dashboard/MetricsCard';
import Table from '../components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MockDashboardRepository } from '../../infrastructure/storage/repositories/MockDashboardRepository';
import { type Dataflow, type DashboardMetrics, type PeriodOption, type TimePeriodValue } from '../../shared/types/dashboard';

const colNames = ['Nome', 'Usuário', 'Última Execução', 'Status'];

const columns = [
    { key: 'name', type: 'text' as const },
    { key: 'user', type: 'text' as const },
    { key: 'lastExecution', type: 'text' as const },
    { key: 'status', type: 'status' as const }
];

const dashboardRepository = new MockDashboardRepository();

const parseLastExecution = (dateString: string): Date => {
    const currentYear = new Date().getFullYear();
    const [datePart, timePart] = dateString.split(' ');
    const [day, month] = datePart.split('/').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    return new Date(currentYear, month - 1, day, hour, minute);
};

const parseISODateLocal = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

const filterDataflowsByPeriod = (dataflows: Dataflow[], periodValue: TimePeriodValue): Dataflow[] => {
    const now = new Date();

    if (periodValue.type === 'custom' && periodValue.dateRange) {
        const startDate = parseISODateLocal(periodValue.dateRange.startDate);
        const endDate = parseISODateLocal(periodValue.dateRange.endDate);
        endDate.setHours(23, 59, 59, 999); // Inclui o dia completo

        return dataflows.filter(df => {
            const executionDate = parseLastExecution(df.lastExecution);
            return executionDate >= startDate && executionDate <= endDate;
        });
    }

    if (periodValue.type === 'preset') {
        let daysAgo = 30; // Default

        switch (periodValue.period) {
            case 'last7days':
                daysAgo = 7;
                break;
            case 'last30days':
                daysAgo = 30;
                break;
            case 'last60days':
                daysAgo = 60;
                break;
            case 'last90days':
                daysAgo = 90;
                break;
            case 'last365days':
                daysAgo = 365;
                break;
        }

        const cutoffDate = new Date(now);
        cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

        return dataflows.filter(df => {
            const executionDate = parseLastExecution(df.lastExecution);
            return executionDate >= cutoffDate;
        });
    }

    return dataflows;
};

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriodValue>({
        type: 'preset',
        period: 'last30days'
    });
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

    const filteredDataFlows = useMemo(() => {
        return filterDataflowsByPeriod(dataFlows, selectedPeriod);
    }, [dataFlows, selectedPeriod]);

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
                <TimePeriodDropdown
                    options={periodOptions}
                    value={selectedPeriod}
                    onChange={(value) => {
                        setSelectedPeriod(value);
                        console.log('Período selecionado:', value);
                    }}
                    containerClassName="w-[280px]"
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
                    <div className="w-full flex flex-row justify-end items-center pb-4">
                        <a href="#" className="text-[#2563EB] text-sm">
                            Ver todos
                            <FontAwesomeIcon icon={faArrowRight} size='xs'/>
                        </a>
                    </div>
                    <div className="w-full bg-white rounded-xl">
                        <div>
                            <Table colNames={colNames} columns={columns} data={filteredDataFlows} />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Dashboard;