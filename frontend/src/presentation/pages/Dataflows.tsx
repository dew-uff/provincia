import { useEffect, useState } from 'react';

import PageTitle from '../components/PageTitle';
import Table from '../components/Table';
import SearchBar from '../components/dataflows/SearchBar';

import { type Dataflow } from '../../shared/types/dashboard';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { DATAFLOW_STATUS_OPTIONS } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import Dropdown from '../components/Dropdown';

const colNames = ['ID','Nome', 'Usuário', 'Última Execução', 'Status', 'Ações'];

const columns = [
    { key: 'id', type: 'text' as const },
    { key: 'name', type: 'text' as const },
    { key: 'user', type: 'text' as const },
    { key: 'lastExecution', type: 'text' as const },
    { key: 'status', type: 'status' as const },
    { key: 'actions', type: 'actions' as const }
];

const dataflowRepository = new MockDataflowRepository();

function Dataflows() {
    const [dataFlows, setDataFlows] = useState<Dataflow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

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

    if (loading) {
        return (
            <main className='flex flex-col items-center p-6 w-full h-full'>
                <div className='container w-full max-w-[800px] flex flex-row align-middle justify-center'>
                    <p>Carregando...</p>
                </div>
            </main>
        );
    }

    /**TODO:
     * - Implements search bar and filters
     * - Implements pagination
     * - Implements actions (view and download)
     */

    return (
        <main className='flex flex-col items-center p-6 w-full h-full'>
            <div className='container w-full max-w-[800px] flex flex-row align-middle justify-between mb-4'>
                <PageTitle title="Dataflows" />
            </div>
            <div className="mt-4.5 container max-w-[800px]">
                <section>
                    <div className='flex flex-row align-middle justify-center gap-6 bg-white rounded-xl shadow-sm'>
                        <SearchBar />
                        <div className="flex flex-1 flex-col align-middle justify-center pr-4">
                            <Dropdown
                                options={DATAFLOW_STATUS_OPTIONS}
                                value={selectedStatus}
                                onChange={(value) => {
                                    setSelectedStatus(value);
                                    console.log(value);
                                }}
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div className="mt-9 container max-w-[800px]">
                <section>
                    <div className="w-full bg-white rounded-xl">
                        <Table colNames={colNames} columns={columns} data={dataFlows} />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Dataflows;