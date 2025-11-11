import type { DashboardData, Dataflow, DashboardMetrics, PeriodOption } from '../../shared/types/dashboard';

export interface IDashboardRepository {
    getDashboardData(): Promise<DashboardData>;
    getRecentDataflows(): Promise<Dataflow[]>;
    getMetrics(): Promise<DashboardMetrics>;
    getPeriodOptions(): PeriodOption[];
}
