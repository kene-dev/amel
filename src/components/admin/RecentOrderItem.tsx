import { CiShare1 } from 'react-icons/ci';

function RecentOrderItem({ status }: { status: 'Pending' | 'Canceled' | 'Delivered' }) {
    const statusStyles = {
        Pending: 'bg-orange-50 text-orange-500',
        Canceled: 'bg-red-50 text-red-500',
        Delivered: 'bg-green-50 text-green-500'
    };
    return (
        <>
            <tr className='bg-white'>
                <td className='text-center'>UE- 001</td>
                <td className='py-2 flex flex-col items-center'>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Date & Time:</p>
                    <p className='text-sm xl:text-base'>23 Sep 2024</p>
                    <p className='text-xs xl:text-sm  text-gray-500'>12:00 am</p>
                </td>
                <td className='text-center'>NGN 500,000</td>
                <td className='text-center'>Umoru Emmanuel</td>
                <td className='text-center'>+23549498490</td>
                <td>
                    <div className='flex items-center justify-center'>
                        <p className={`${statusStyles[status]} w-fit px-2 rounded-md`}>{status}</p>
                    </div>
                </td>
                <td>
                    <span className='flex justify-center'>
                        <CiShare1 size={25} />
                    </span>
                </td>
            </tr>
            <div className='py-2'></div>
        </>
    );
}
export default RecentOrderItem;
