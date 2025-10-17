import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Dropdown from '../components/Dropdown';

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('option1');

    return (
        <main className='flex flex-col items-center p-6 w-full h-full'>
            <div className='w-full max-w-[800px] flex flex-row align-middle justify-between mb-4'>
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
            <div>
                <section>
                    <div className='container flex flex-row align-middle justify-center gap-6'>
                        <div className='bg-white rounded-xl shadow-sm p-6 flex-[0_0_180px]'>
                            <h2>156</h2>
                            <p>Dataflows</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm flex-[0_0_180px]'>
                            <h2>156</h2>
                            <p>Dataflows</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm flex-[0_0_180px]'>
                            <h2>156</h2>
                            <p>Dataflows</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm flex-[0_0_180px]'>
                            <h2>156</h2>
                            <p>Dataflows</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Dashboard;