import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Dropdown from '../components/Dropdown';

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('option1');

    return (
        <main className='mx-auto my-0 p-4'>
            <div className='container flex flex-row align-middle justify-between mb-4'>
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
        </main>
    );
};

export default Dashboard;