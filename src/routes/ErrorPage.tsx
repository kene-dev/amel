import { NavLink } from 'react-router-dom';

function ErrorPage() {
    return (
        <section className='container h-screen grid place-items-center'>
            <div className='space-y-2 '>
                <h1 className='text-6xl text-center font-bold font-poppins text-black'>404</h1>
                <p className='text-2xl font-sans font-semibold text-gray-600'>Oops...we could not find the page you're looking for ☹️</p>
                <div className='flex items-center justify-center py-3'>
                    <NavLink className='text-gray-50 font-semibold px-4 py-2 bg-blue-700 rounded-md uppercase shadow hover:bg-blue-500' to='/'>
                        Go back home
                    </NavLink>
                </div>
            </div>
        </section>
    );
}
export default ErrorPage;
