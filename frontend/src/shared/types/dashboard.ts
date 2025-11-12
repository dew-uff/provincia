import { type StatusType, type RowData } from './table';

// Tipo para Dataflow
export interface Dataflow extends RowData {
    id: string;
    name: string;
    user: string;
    lastExecution: string;
    status: StatusType;
}

// Tipo para Métricas do Dashboard
export interface DashboardMetrics {
    dataflows: number;
    executions: number;
    activeUsers: number;
    datasets: number;
}

// Tipo para opções de período
export interface PeriodOption {
    label: string;
    value: string;
}

// Tipo para opções de status de dataflow
export interface StatusOption {
    label: string;
    value: StatusType | 'all';
}

// Tipo completo de dados do Dashboard
export interface DashboardData {
    metrics: DashboardMetrics;
    recentDataflows: Dataflow[];
    periodOptions: PeriodOption[];
}
