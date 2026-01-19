import type { Dataflow, DataflowDetails } from '../../shared/types/dashboard';

export interface IDataflowRepository {
    getAllDataflows(): Promise<Dataflow[]>;
    getDataflowById(id: string): Promise<DataflowDetails | null>;
}
