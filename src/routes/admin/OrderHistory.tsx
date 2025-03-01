import { BiSolidDiscount } from 'react-icons/bi';
import image from '../../assets/webp/amel_cocoa.webp';

function OrderHistory() {
    return (
        <>
            <tr className='bg-white'>
                <td className='text-center px-2'>
                    <div className='flex justify-center items-center py-2'>
                        <img className='size-12 object-cover' src={image} />
                    </div>
                </td>
                <td className='text-center'>Icing Sugar</td>{' '}
                <td>
                    <p className='flex  items-center justify-center capitalize'>Breakfast Products</p>
                </td>
                <td className='py-2 flex flex-col items-center'>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Date & Time:</p>
                    <p className='text-xs xl:text-sm'>23 Sep 2024</p>
                    <p className='text-xs xl:text-sm  text-gray-500'>12:00 am</p>
                </td>
                <td className='text-center px-2'>
                    <p>Emmanuel teyEmmal </p>
                </td>
                <td>
                    <div className='flex items-center gap-1'>
                        <BiSolidDiscount fill='#DB4444' size={20} />
                        <p>NGN 500,000</p>
                    </div>
                </td>
                <td>
                    <div className='flex items-center justify-center'>10</div>
                </td>
                <td>
                    <div className='flex items-center justify-center px-4'>
                        <span className='text-sm bg-green-200 text-green-600 px-3 py-1 rounded-lg'>Fulfilled</span>
                    </div>
                </td>
            </tr>
            <div className='py-1'></div>
        </>
    );
}
export default OrderHistory;
