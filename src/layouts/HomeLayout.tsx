import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Footer, Navbar } from '../components';

function HomeLayout() {
    return (
        <>
            <Navbar />
            <main className='w-full'>
                <ScrollRestoration />
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
export default HomeLayout;
