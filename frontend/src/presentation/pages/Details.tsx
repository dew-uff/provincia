import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { type Dataflow } from '../../shared/types/dashboard';
import Loader from '../components/Loader';

const dataflowRepository = new MockDataflowRepository();

function Details() {
    const { id } = useParams<{ id: string }>();
    const [dataflow, setDataflow] = useState<Dataflow | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                if (id) {
                    const data = await dataflowRepository.getDataflowById(id);
                    setDataflow(data);
                }
            } catch (error) {
                console.error('Erro ao carregar dataflows:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (!dataflow) {
        return (
            <div className='flex flex-col items-center p-6 w-full h-full'>
                <div className='container w-full max-w-[900px]'>
                    <h1 className='text-2xl font-bold text-gray-900'>Dataflow não encontrado</h1>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center p-6 w-full h-full'>
            <div className='container w-full max-w-[900px]'>
                <h1>Detalhes do dataflow</h1>
            </div>
        </div>
    );
}

export default Details;