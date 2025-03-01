import { RiFilter2Fill, RiSearch2Line } from 'react-icons/ri';
import { motion } from 'framer-motion';

function Coupons() {
    const coupons = [
        {
            code: '23001',
            percentage: '19%',
            expiry: '23 Sep 2024',
            amountCap: 'NGN 500,000',
            appliedCount: 123
        },
        {
            code: '23002',
            percentage: '25%',
            expiry: '01 Oct 2024',
            amountCap: 'NGN 700,000',
            appliedCount: 200
        }
        // Add more coupon data as needed
    ];

    return (
        <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='space-y-6 h-screen mt-12 flex flex-col'>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex justify-between'>
                <div className='flex items-center md:justify-start justify-between gap-3 md:gap-6 '>
                    <h1 className='text-xl xl:text-3xl'>Coupons</h1>
                    <div className=' max-w-[50%] md:max-w-sm md:px-4 px-2  text-sm md:text-base flex items-center border border-gray-400 rounded-3xl bg-transparent w-fit py-2'>
                        <input className='bg-transparent outline-none indent-2 w-[90%] md:w-auto' type='text' placeholder='Search coupons' name='search' />
                        <RiSearch2Line size={20} />
                    </div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='hidden xl:block overflow-auto max-h-[90%] flex-1'>
                <motion.table initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='w-full'>
                    <thead>
                        <tr className='capitalize'>
                            <th className=' text-gray-500 pb-4 font-semibold'>Coupon Code</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>percentage</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>expiry</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>amount cap</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>No. Of Applied</th>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex justify-center  items-center'>
                                <button type='button' className='flex items-center gap-1 hover:bg-gray-50 hover:shadow-sm bg-white  rounded text-sm py-1  px-2'>
                                    <RiFilter2Fill size={16} /> Filter
                                </button>
                            </motion.div>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map thru this later */}
                        <>
                            <tr className='bg-white'>
                                <td className='text-center py-4'>23001</td>
                                <td className='py-4 flex flex-col items-center'>19%</td>
                                <td className='text-center'>
                                    <p className='text-sm xl:text-base'>23 Sep 2024</p>
                                </td>
                                <td className='text-center'>NGN 500,000</td>
                                <td className='text-center'>123</td>
                            </tr>
                            <div className='py-2'></div>
                        </>
                        <>
                            <tr className='bg-white'>
                                <td className='text-center py-4'>23001</td>
                                <td className='py-4 flex flex-col items-center'>19%</td>
                                <td className='text-center'>
                                    <p className='text-sm xl:text-base'>23 Sep 2024</p>
                                </td>
                                <td className='text-center'>NGN 500,000</td>
                                <td className='text-center'>123</td>
                            </tr>
                            <div className='py-2'></div>
                        </>
                    </tbody>
                </motion.table>
            </motion.div>
            {/* mobile view */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='block xl:hidden flex-1 overflow-auto space-y-4'>
                {coupons.map((coupon) => (
                    <div key={coupon.code} className='bg-white shadow-md rounded-lg p-4 border space-y-2'>
                        <div className='flex justify-between items-center'>
                            <span className='font-semibold text-lg'>Code: {coupon.code}</span>
                            <span className='text-sm text-gray-500'>{coupon.percentage} Off</span>
                        </div>
                        <div className='space-y-1 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Expiry</span>
                                <span>{coupon.expiry}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Amount Cap</span>
                                <span>{coupon.amountCap}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Applied Count</span>
                                <span>{coupon.appliedCount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.section>
    );
}
export default Coupons;
