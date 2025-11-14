import { useEffect, useState } from 'react';

import PageTitle from '../components/PageTitle';
import Table from '../components/Table';
import SearchBar from '../components/dataflows/SearchBar';

import { type Dataflow } from '../../shared/types/dashboard';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { DATAFLOW_STATUS_OPTIONS } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

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
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    // Filtrar dataflows com base no termo de busca e status
    const filteredDataFlows = dataFlows.filter((dataflow) => {
        // Filtro de status
        const statusMatch = selectedStatus === 'all' || dataflow.status === selectedStatus;

        // Filtro de busca - buscar em todos os campos textuais
        const searchLower = searchTerm.toLowerCase();
        const searchMatch = searchTerm === '' ||
            dataflow.id.toLowerCase().includes(searchLower) ||
            dataflow.name.toLowerCase().includes(searchLower) ||
            dataflow.user.toLowerCase().includes(searchLower) ||
            dataflow.lastExecution.toLowerCase().includes(searchLower) ||
            dataflow.status.toLowerCase().includes(searchLower);

        return statusMatch && searchMatch;
    });

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
                    <div className='w-full flex flex-row align-middle justify-between bg-white rounded-xl shadow-sm gap-6'>
                        <div className='pl-6 py-4 flex flex-1'>
                            <SearchBar value={searchTerm} onChange={setSearchTerm} />
                        </div>
                        <div className="flex flex-col max-w-[200px] align-middle justify-center ">
                            <Dropdown
                                options={DATAFLOW_STATUS_OPTIONS}
                                value={selectedStatus}
                                onChange={(value) => {
                                    setSelectedStatus(value);
                                }}
                            />
                        </div>
                        <div className='w-full max-w-[120px] flex pr-[20px] py-[20px]'>
                            <Button 
                                type="button"
                                onClick={() => console.log("novo dataflow")}
                                className="w-full cursor-pointer align-middle justify-center"
                            >
                                + Novo
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
            <div className="mt-9 container max-w-[800px]">
                <section>
                    <div className="w-full bg-white rounded-xl">
                        <Table colNames={colNames} columns={columns} data={filteredDataFlows} />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Dataflows;