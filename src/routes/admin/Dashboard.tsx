import { FaBell, FaSackDollar } from 'react-icons/fa6';
import { Card, RecentOrderItem } from '../../components/admin';
import { GiShoppingBag } from 'react-icons/gi';
import { motion } from 'framer-motion';

function Dashboard() {
    const ORDER_STATUS = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Canceled: 'bg-red-100 text-red-800',
        Delivered: 'bg-green-100 text-green-800'
    };
    const orders = [
        { id: '#1234', date: '2024-02-15 10:30', amount: '$45.99', name: 'John Doe', phone: '555-1234', status: 'Pending' },
        { id: '#5678', date: '2024-02-14 15:45', amount: '$89.50', name: 'Jane Smith', phone: '555-5678', status: 'Canceled' },
        { id: '#5678', date: '2024-02-14 15:45', amount: '$89.50', name: 'Jane Smith', phone: '555-5678', status: 'Canceled' },
        { id: '#5678', date: '2024-02-14 15:45', amount: '$89.50', name: 'Jane Smith', phone: '555-5678', status: 'Canceled' },
        { id: '#5678', date: '2024-02-14 15:45', amount: '$89.50', name: 'Jane Smith', phone: '555-5678', status: 'Canceled' },
        { id: '#9012', date: '2024-02-13 09:15', amount: '$67.25', name: 'Mike Johnson', phone: '555-9012', status: 'Delivered' }
    ];

    return (
        <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='space-y-6 h-screen xl:mt-12 flex flex-col'>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex justify-end'>
                <FaBell className='cursor-pointer' fill='#b33737' size={25} />
                <div className='-ml-[11px] z-20 rounded-full bg-red-500 size-2 border border-white shadow-sm'></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='grid grid-cols-2 gap-4 md:flex md:justify-start  md:flex-nowrap md:gap-3'>
                <Card icon={<FaSackDollar fill='#DB4444' size={25} />} label='Total Revenue' figures='100,000,000' />
                <Card icon={<GiShoppingBag fill='#DB4444' size={25} />} label='Total Order' figures='100,000,000' />
                <Card icon={<FaSackDollar fill='#DB4444' size={25} />} label="Today's Revenue" figures='100,000,000' />
                <Card icon={<GiShoppingBag fill='#DB4444' size={25} />} label="Today's Order" figures='100,000,000' />
            </motion.div>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex justify-between'>
                <h1 className='text-xl md:text-2xl'>Recent Orders</h1>
                <button className='bg-white py-1 px-2 rounded text-xs md:text-sm shadow-sm hover:bg-gray-50 hover:shadow' type='button'>
                    See all
                </button>
            </motion.span>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='hidden md:block overflow-auto max-h-[90%] flex-1'>
                <table className='w-full'>
                    <thead>
                        <tr className='uppercase'>
                            <th className='font-bold text-gray-600 pb-4'>order id</th>
                            <th className='font-bold text-gray-600 pb-4'>date & time</th>
                            <th className='font-bold text-gray-600 pb-4'>amount</th>
                            <th className='font-bold text-gray-600 pb-4'>name</th>
                            <th className='font-bold text-gray-600 pb-4'>phone number</th>
                            <th className='font-bold text-gray-600 pb-4'>status</th>
                            <th className='font-bold text-gray-600 pb-4'>details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <RecentOrderItem status='Pending' />
                        <RecentOrderItem status='Canceled' />
                        <RecentOrderItem status='Delivered' />
                        <RecentOrderItem status='Pending' />
                        <RecentOrderItem status='Canceled' />
                        <RecentOrderItem status='Delivered' />
                        <RecentOrderItem status='Pending' />
                        <RecentOrderItem status='Canceled' />
                        <RecentOrderItem status='Delivered' />
                    </tbody>
                </table>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='md:hidden block space-y-4 px-4 pb-24'>
                {orders.map((order) => {
                    return (
                        <div key={order.id} className='bg-white shadow-md rounded-lg p-4 border'>
                            <div className='flex justify-between items-center mb-3'>
                                <span className='font-bold text-lg'>{order.id}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${ORDER_STATUS[order.status as keyof typeof ORDER_STATUS]}`}>{order.status}</span>
                            </div>
                            <div className='space-y-2 text-sm'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Date & Time</span>
                                    <span>{order.date}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Amount</span>
                                    <span>{order.amount}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Name</span>
                                    <span>{order.name}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Phone</span>
                                    <span>{order.phone}</span>
                                </div>
                            </div>
                            <button className='w-full mt-4 bg-orange-500 text-sm text-white py-2 rounded-md hover:bg-orange-600 transition-colors'>View Details</button>
                        </div>
                    );
                })}
            </motion.div>
        </motion.section>
    );
}
export default Dashboard;
