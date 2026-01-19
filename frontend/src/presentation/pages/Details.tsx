import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MockDataflowRepository } from '../../infrastructure/storage/repositories/MockDataflowRepository';
import { type DataflowDetails } from '../../shared/types/dashboard';
import Loader from '../components/Loader';

const dataflowRepository = new MockDataflowRepository();

function Details() {
    const { id } = useParams<{ id: string }>();
    const [dataflow, setDataflow] = useState<DataflowDetails | null>(null);
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
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center">
                                <h2 className="text-2xl font-bold text-gray-900">{dataflow.name}</h2>
                                <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                OK
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{dataflow.description}</p>
                            
                            <div className="mt-4 flex items-center space-x-6 text-sm">
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Criado por <strong>{dataflow.user}</strong></span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Criado em <strong>{dataflow.created}</strong></span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Última execução <strong>{dataflow.lastExecution}</strong></span>
                                </div>
                            </div>
                        </div>

                            <div className="flex items-center space-x-3">
                                <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    Editar
                                </button>
                                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Ver Grafo
                                </button>
                            </div>
                    </div>
                </div>            
            </div>
        </div>
    );
}

export default Details;