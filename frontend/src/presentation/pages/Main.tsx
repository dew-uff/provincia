import { Outlet } from 'react-router-dom';
import Header from '../components/Header'; // seu header

const Main = () => {
    return (
        <div className='bg-[#F3F4F6]'>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Main;