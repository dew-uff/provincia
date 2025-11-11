import { useEffect, useState } from 'react';

import PageTitle from '../components/PageTitle';
import Table from '../components/dashboard/Table';

import { type Dataflow } from '../../shared/types/dashboard';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

/**TO DO:
 *
 * - Fix date prop in Dataflow type to Date type instead of string
 */

function Dataflows() {
    const [dataFlows, setDataFlows] = useState<Dataflow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <main className='flex flex-col items-center p-6 w-full h-full'>
            <div className='container w-full max-w-[800px] flex flex-row align-middle justify-between mb-4'>
                <PageTitle title="Dashboard" />
            </div>
            <div className="mt-4.5 container max-w-[800px]">
                <section>
                    <div className='flex flex-row align-middle justify-center gap-6'>
                        
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
}

export default Dataflows;