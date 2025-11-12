import { type IDashboardRepository } from '../../../domain/repositories/IDashboardRepository';
import { type DashboardData, type Dataflow, type DashboardMetrics, type PeriodOption } from '../../../shared/types/dashboard';

const MOCK_METRICS: DashboardMetrics = {
    dataflows: 156,
    executions: 1234,
    activeUsers: 23,
    datasets: 456,
};

const MOCK_DATAFLOWS: Dataflow[] = [
    {
        id: '1',
        name: "Extração frames",
        user: "maria.falci",
        lastExecution: "06/10 09:15",
        status: "ok"
    },
    {
        id: '2',
        name: "Treinamento DNN",
        user: "maria.falci",
        lastExecution: "06/10 14:22",
        status: "ok"
    },
    {
        id: '3',
        name: "Coleta videos",
        user: "joao.silva",
        lastExecution: "05/10 18:45",
        status: "ok"
    },
    {
        id: '4',
        name: "Pre-processamento",
        user: "ana.souza",
        lastExecution: "05/10 20:10",
        status: "alerta"
    }
];

const MOCK_PERIOD_OPTIONS: PeriodOption[] = [
    { label: 'Últimos 7 dias', value: 'option1' },
    { label: 'Últimos 30 dias', value: 'option2' },
    { label: 'Últimos 90 dias', value: 'option3' },
    { label: 'Últimos 365 dias', value: 'option4' },
    { label: 'Todos', value: 'option5' }
];

export class MockDashboardRepository implements IDashboardRepository {

    async getDashboardData(): Promise<DashboardData> {
        await this.simulateDelay(500);

        return {
            metrics: MOCK_METRICS,
            recentDataflows: MOCK_DATAFLOWS,
            periodOptions: MOCK_PERIOD_OPTIONS,
        };
    }

    async getRecentDataflows(): Promise<Dataflow[]> {
        await this.simulateDelay(300);
        return MOCK_DATAFLOWS;
    }

    async getMetrics(): Promise<DashboardMetrics> {
        await this.simulateDelay(200);
        return MOCK_METRICS;
    }

    getPeriodOptions(): PeriodOption[] {
        return MOCK_PERIOD_OPTIONS;
    }

    private async simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
