import { useState } from 'react';
import { RiFilter2Fill, RiSearch2Line } from 'react-icons/ri';
import NewOrders from './NewOrders';
import OrderHistory from './OrderHistory';
import { motion } from 'framer-motion';
import MobileNewOrders from './MobileNewOrders';
import MobileOrderHistory from './MobileOrderHistory';

function Orders() {
    const [activeTab, setActiveTab] = useState('new');
    const tabs = [
        {
            id: 'new',
            label: 'New',
            component: <NewOrders />
        },
        {
            id: 'history',
            label: 'History',
            component: <OrderHistory />
        }
    ];
    const mobileTabs = [
        {
            id: 'new',
            label: 'New',
            component: <MobileNewOrders />
        },
        {
            id: 'history',
            label: 'History',
            component: <MobileOrderHistory />
        }
    ];
    return (
        <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='space-y-4 h-screen xl:mt-12'>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex justify-between'>
                <div className='flex items-center md:justify-start justify-between gap-3 md:gap-6 '>
                    <h1 className='text-xl xl:text-3xl'>Orders</h1>
                    <div className=' max-w-[50%] md:max-w-sm md:px-4 px-2  text-sm md:text-base flex items-center border border-gray-400 rounded-3xl bg-transparent w-fit py-2'>
                        <input className='bg-transparent outline-none indent-2 w-[90%] md:w-auto' type='text' placeholder='Search orders' name='search' />
                        <RiSearch2Line size={20} />
                    </div>
                </div>
            </motion.div>
            <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='hidden xl:flex gap-6 items-center'>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={
                            activeTab === tab.id
                                ? 'text-black font-semibold relative after:absolute after:left-0 after:right-[60%] after:bottom-0 after:rounded-full after:border-b-2 after:border-just-red capitalize text-lg'
                                : 'capitalize text-lg text-black/70'
                        }>
                        {tab.label}
                    </button>
                ))}
            </motion.nav>
            <motion.table initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='hidden xl:block w-full '>
                <thead>
                    <tr>
                        <th className='text-gray-500 pb-4 font-semibold'>Image</th>
                        <th className='text-gray-500 pb-4 font-semibold'>Product Name</th>
                        <th className='text-gray-500 pb-4 font-semibold'>Category</th>
                        <th className='text-gray-500 pb-4 font-semibold'>Date & Time</th>
                        <th className='text-gray-500 pb-4 font-semibold'>Customer Name</th>
                        <th className='text-gray-500 pb-4 font-semibold'>Amount</th>
                        <th className='text-gray-500 pb-4 font-semibold'>Quantity</th>
                        <th className='text-gray-500 pb-4 font-semibold'>Status</th>
                        <th>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex justify-center items-center -mt-4'>
                                <button type='button' className='flex items-center gap-1 hover:bg-gray-50 hover:shadow-sm bg-white rounded text-sm py-1 px-2'>
                                    <RiFilter2Fill size={16} /> Filter
                                </button>
                            </motion.div>
                        </th>
                    </tr>
                </thead>
                <motion.tbody key={activeTab} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    {tabs.find((tab) => tab.id === activeTab)?.component}
                </motion.tbody>
            </motion.table>

            {/* mobile view */}
            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='block xl:hidden space-y-4 h-screen xl:mt-12'>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex flex-col gap-4'>
                    <div className='flex gap-6'>
                        {mobileTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={
                                    activeTab === tab.id
                                        ? 'text-black font-semibold relative after:absolute after:left-0 after:right-[60%] after:bottom-0 after:rounded-full after:border-b-2 after:border-just-red capitalize text-lg'
                                        : 'capitalize text-lg text-black/70'
                                }>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='space-y-4'>
                    {mobileTabs.find((tab) => tab.id === activeTab)?.component}
                </motion.div>
            </motion.section>
        </motion.section>
    );
}
export default Orders;
