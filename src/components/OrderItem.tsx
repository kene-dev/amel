import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import OrderStatus from './OrderStatus';
import { Order } from '../utils/types';
type orderItemProp = {
    orders: Order[] | undefined,
}


function OrderItem({orders}:orderItemProp) {
    const formatDate = (isoDate: string) => {
        return new Date(isoDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };
    return (
    <div>
        {orders?.map(order => (
            <div className='p-3 md:p-0  grid gap-1 place-items-start  md:place-items-center text-xs md:text-base grid-cols-2 grid-flow-row md:grid-cols-7 items-center rounded-md bg-white  border md:bottom-0 hover:drop-shadow-lg hover:bg-gray-50 transition-all ease-in-out duration-300 drop-shadow-md '>
                <span className='text-sm xl:text-base md:mx-1 '>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Item:</p>{order._id.slice(0,10)}
                </span>
                <span className='text-sm xl:text-base flex gap-1 items-center'>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Quantity:</p>{order.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
                <div className='py-2'>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Date & Time:</p>
                    <p className='text-sm xl:text-base'>{formatDate(order.createdAt)}</p>
                    <p className='text-xs xl:text-sm  text-gray-500'>12:00 am</p>
                </div>
                <span className='md:px-4 px-1 text-sm xl:text-base'>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Total Amount:</p>NGN{order.cost}
                </span>
                <span className='text-sm xl:text-base'>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Phone Number:</p>0890839303
                </span>
                <div>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Status:</p>
                    <OrderStatus status={order.status} />
                </div>
                <span className='flex items-center'>
                    <p className='font-medium md:hidden text-sm text-zinc-400'>Details</p>
                    <MdOutlineKeyboardDoubleArrowUp className='hidden md:block rotate-45' size={30} />
                    <MdOutlineKeyboardDoubleArrowUp className='block md:hidden rotate-45' size={24} />
                </span>
            </div>
        ))}
    </div>
    );
}
export default OrderItem;
