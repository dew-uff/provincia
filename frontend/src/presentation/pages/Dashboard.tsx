import React from 'react';
import PageTitle from '../components/PageTitle';
import { PeriodDropdown } from '../components/PeriodDropdown';

const Dashboard: React.FC = () => {
    return (
        <main className='bg-[#F3F4F6]'>
            <div className="container flex flex-row align-middle justify-between mx-auto my-0 p-8">
                <PageTitle title="Dashboard" />
                <PeriodDropdown onFilterChange={(days) => console.log(`Filter changed to last ${days} days`)} />
            </div>
        </main>
    );
};

export default Dashboard;