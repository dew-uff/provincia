import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Dropdown from '../components/Dropdown';
import MetricsCard from '../components/dashboard/MetricsCard';
import TableRow from '../components/dashboard/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('option1');

    return (
        <main className='flex flex-col items-center p-6 w-full h-full'>
            <div className='container w-full max-w-[800px] flex flex-row align-middle justify-between mb-4'>
                <PageTitle title="Dashboard" />
                <Dropdown
                    options={[
                        { label: 'Últimos 7 dias', value: 'option1' },
                        { label: 'Últimos 30 dias', value: 'option2' },
                        { label: 'Últimos 90 dias', value: 'option3' },
                        { label: 'Últimos 365 dias', value: 'option4' },
                        { label: 'Todos', value: 'option5' }
                    ]}
                    value={selectedPeriod}
                    onChange={(value) => {
                        setSelectedPeriod(value);
                        console.log(value);
                    }}
                 />
            </div>
            <div className="mt-4.5 container max-w-[800px]">
                <section>
                    <div className='flex flex-row align-middle justify-center gap-6'>
                        <MetricsCard numbers="156" indicator="Dataflows" />
                        <MetricsCard numbers="1,234" indicator="Execuções" />
                        <MetricsCard numbers="23" indicator="Usuários Ativos" /> 
                        <MetricsCard numbers="456" indicator="Datasets" />   
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
                            <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="text-left px-3 py-3 text-gray-500 font-semibold text-sm border-b-2 border-gray-200">Nome</th>
                                            <th className="text-left px-3 py-3 text-gray-500 font-semibold text-sm border-b-2 border-gray-200">Usuário</th>
                                            <th className="text-left px-3 py-3 text-gray-500 font-semibold text-sm border-b-2 border-gray-200">Última Execução</th>
                                            <th className="text-left px-3 py-3 text-gray-500 font-semibold text-sm border-b-2 border-gray-200">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TableRow name="Extração Frames" user="maria.falci" lastExecution="06/10 09:15" status="ok" />
                                        <TableRow name="Treinamento DNN" user="maria.falci" lastExecution="06/10 14:22" status="ok" />
                                        <TableRow name="Coleta Videos" user="joao.silva" lastExecution="05/10 18:45" status="ok" />
                                        <TableRow name="Pre-processamento" user="ana.souza" lastExecution="05/10 20:10" status="alerta" />                              
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Dashboard;