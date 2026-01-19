import { type StatusType, type RowData } from './table';

// Tipo para Dataflow
export interface Dataflow extends RowData {
    id: string;
    name: string;
    user: string;
    lastExecution: string;
    status: StatusType;
}

// Tipo para execução de dataflow
export interface DataflowExecution {
    id: string;
    timestamp: string;
    user: string;
    duration: string;
    tasks: string;
    status: 'ok' | 'warning' | 'error';
}

// Tipo para dataset gerado
export interface DataflowDataset {
    id: string;
    name: string;
    records: number;
    size: string;
    created: string;
}

// Tipo para dependência de dataflow
export interface DataflowDependency {
    id: string;
    name: string;
    description: string;
}

// Tipo para detalhes completos do Dataflow
export interface DataflowDetails extends Dataflow {
    description: string;
    created: string;
    version: string;
    schedule: string;
    inputSources: string[];
    outputDestinations: string[];
    avgDuration: string;
    successRate: number;
    lastModified: string;
    modifiedBy: string;
    tags: string[];
    recentExecutions: DataflowExecution[];
    datasets: DataflowDataset[];
    upstreamDependencies: DataflowDependency[];
    downstreamDependencies: DataflowDependency[];
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

// Tipo para intervalo de datas customizado
export interface DateRange {
    startDate: string;  // Formato ISO: YYYY-MM-DD
    endDate: string;    // Formato ISO: YYYY-MM-DD
}

// Tipo para valor de período de tempo (preset ou customizado)
export interface TimePeriodValue {
    type: 'preset' | 'custom';
    period: string;  // 'last7days' | 'last30days' | 'last60days' | 'last90days' | 'last365days' | 'custom'
    dateRange?: DateRange;  // Presente apenas quando type === 'custom'
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
