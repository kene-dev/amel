import { IoExit } from 'react-icons/io5';
import { motion } from 'framer-motion';
import inventoryIcon from '../assets/svgs/inventory_icon.svg';
import { OrderItem } from '../components';
import { useDispatch } from 'react-redux';
import { useGetSingleUserQuery } from '../features/auth/authApiSlice';
import { logOut } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { apiSlice } from '../features/apiSlice';
import { useGetMyOrderQuery } from '../features/order/orderApiSlice';


function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {data} = useGetSingleUserQuery();
    const {data:myOrders} = useGetMyOrderQuery()

    const handleLogout = () => {
        dispatch(logOut())
        dispatch(apiSlice.util.resetApiState());
    }

    console.log(myOrders)
    return (
        <>
            <div className='bg-milk h-48'></div>
            <div className='-mt-44 flex flex-col md:flex-row justify-center gap-10 px-8 '>
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
                    className='rounded-3xl flex size-44 gap-4 p-4 bg-slate-800 text-white xl:w-[40%]'>
                    {/* <div className='border-2 border-white rounded-3xl '>
                        <img className='size-24 md:size-40 object-cover rounded-3xl' src={image} />
                    </div> */}
                    <div className='flex flex-col justify-between items-start md:h-[95%] w-[80%]'>
                        <span>
                            <h1 onClick={() => navigate('/admin')} className='text-lg md:text-4xl font-semibold line-clamp-1'>
                               {data?.firstName ?? '' + data?.lastName ?? ''}
                            </h1>
                            <h4 className='text-sm md:text-lg text-gray-200'>
                                {data?.email}
                            </h4>
                        </span>

                        <button
                            onClick={handleLogout}
                            className='flex items-center gap-1 md:px-4 px-3 py-1 md:py-2 text-sm md:text-base text-gray-100  bg-just-red rounded-lg hover:bg-red-600 hover:scale-105 transition-all ease-in-out duration-300'
                           >
                            <IoExit size={24} /> Log Out
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
                    className='md:w-1/5 flex flex-col justify-between bg-slate-800 text-white p-4 rounded-3xl'>
                    <div className='flex  items-center justify-between'>
                        <h1>Total Orders</h1>
                        <div className='bg-slate-700 rounded-md drop-shadow-lg p-2'>
                            <img className='size-5' src={inventoryIcon} />
                        </div>
                    </div>
                    <span className='text-4xl font-semibold py-2 md:py-0'>0</span>
                </motion.div>
            </div>
            <motion.section
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.6 }}
                className='bg-white h-screen mt-6 px-2'>
                <h1 className='px-2 md:px-8 text-2xl font-semibold'>Orders</h1>
                <table className='table-auto w-full'>
                    <thead className='hidden md:grid place-items-center grid-rows-1 grid-cols-7 text-slate-700'>
                        <th className='p-4 text-sm xl:text-base font-medium text-start'>Item</th>
                        <th className='p-4 text-sm xl:text-base font-medium text-start'>Quantity</th>
                        <th className='p-4 text-sm xl:text-base font-medium text-start'>Date & Time</th>
                        <th className='p-4 text-sm xl:text-base font-medium text-start'>Total Amount</th>
                        <th className='p-4 text-sm xl:text-base font-medium text-start'>Phone Number</th>
                        <th className='p-4 text-sm xl:text-base font-medium text-start'>Status</th>
                        <th className='p-4 text-sm xl:text-base font-medium text-start'>Details</th>
                    </thead>
                    <tbody className='flex flex-col justify-around h-full gap-4 my-4'>
                        <OrderItem orders={myOrders} />
                    </tbody>
                </table>
            </motion.section>
        </>
    );
}
export default Account;
