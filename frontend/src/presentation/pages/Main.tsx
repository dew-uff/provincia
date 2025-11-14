import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Main = () => {
    return (
        <div className='bg-[#F3F4F6] min-h-screen'>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Main;