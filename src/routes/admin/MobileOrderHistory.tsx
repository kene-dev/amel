import { BiSolidDiscount } from 'react-icons/bi';
import { motion } from 'framer-motion';
import image from '../../assets/webp/amel_cocoa.webp';

function MobileOrderHistory() {
    const orders = [
        {
            id: 1,
            name: 'Icing Sugar',
            category: 'Breakfast Products',
            date: '23 Sep 2024',
            time: '12:00 am',
            customer: 'Emmanuel teyEmmal',
            amount: 'NGN 500,000',
            quantity: 10
        }
        // Add more order data as needed
    ];

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='space-y-4'>
            {orders.map((order) => (
                <div key={order.id} className='bg-white shadow-md rounded-lg p-4 border space-y-2'>
                    <div className='flex justify-between items-center'>
                        <span className='font-bold text-lg'>{order.name}</span>
                        <span className='text-sm capitalize text-gray-500'>{order.category}</span>
                    </div>
                    <div className='flex justify-center'>
                        <img src={image} alt={order.name} className='w-20 h-20 object-cover rounded-md' />
                    </div>
                    <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                            <span className='text-gray-600'>Date</span>
                            <span>{order.date}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-gray-600'>Time</span>
                            <span>{order.time}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-gray-600'>Customer</span>
                            <span>{order.customer}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-gray-600'>Amount</span>
                            <div className='flex items-center gap-1'>
                                <BiSolidDiscount fill='#DB4444' size={20} />
                                <span>{order.amount}</span>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-gray-600'>Quantity</span>
                            <span>{order.quantity}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-gray-600'>Status</span>
                            <span className='text-sm bg-green-200 text-green-600 px-3 py-1 rounded-lg'>Fulfilled</span>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

export default MobileOrderHistory;
