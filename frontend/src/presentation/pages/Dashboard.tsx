import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Dropdown from '../components/Dropdown';
import MetricsCard from '../components/dashboard/MetricsCard';
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
                            <table className="w-full mt-4 table-auto text-left">
                                <thead className='w-full'>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Usuário</th>
                                        <th>Última Execução</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Extração Frames</td>
                                        <td>maria.falci</td>
                                        <td>06/10 15:30</td>
                                        <td>✓ OK</td>
                                    </tr>
                                    <tr>
                                        <td>Treinamento DNN</td>
                                        <td>maria.falci</td>
                                        <td>06/10 14:22</td>
                                        <td>✓ OK</td>
                                    </tr>
                                    <tr>
                                        <td>Coleta Videos</td>
                                        <td>usuario3</td>
                                        <td>05/10 18:45</td>
                                        <td>✓ OK</td>
                                    </tr>
                                    <tr>
                                        <td>Pre-processamento</td>
                                        <td>usuario2</td>
                                        <td>05/10 12:10</td>
                                        <td>⚠ Alerta</td>
                                    </tr>
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