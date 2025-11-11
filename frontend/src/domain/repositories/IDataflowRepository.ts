import type { Dataflow } from '../../shared/types/dashboard';

export interface IDataflowRepository {
    getAllDataflows(): Promise<Dataflow[]>;
    getDataflowById(id: string): Promise<Dataflow | null>;
}
