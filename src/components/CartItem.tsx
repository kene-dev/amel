import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { useDispatch } from 'react-redux';

import { decrementQuantity, incrementQuantity, removeFromCart } from '../features/cart/cartSlice';
import { MdCancel } from 'react-icons/md';
interface cartProps {
    _id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

function CartItem({ _id, image, name, price, quantity, subtotal }: cartProps) {
    const dispatch = useDispatch();

    const handleIncrement = (productId: string) => {
        dispatch(incrementQuantity(productId));
    };

    const handleDecrement = (productId: string) => {
        dispatch(decrementQuantity(productId));
    };
    return (
        <div className='p-1 md:p-0 grid  text-xs md:text-base grid-cols-4 items-center rounded-md bg-white   hover:drop-shadow-lg hover:bg-gray-50 transition-all ease-in-out duration-300 drop-shadow-md'>
            <div className='flex md:flex-row flex-col md:items-center'>
                <MdCancel className='-mt-12 -mr-4 z-20 bg-white rounded-full drop-shadow-sm cursor-pointer' size={20} fill='red' onClick={() => dispatch(removeFromCart(_id))} />
                <img className='size-12 object-contain md:size-16' src={image} />
                <span>{name}</span>
            </div>
            <span className='md:px-4 px-1'>NGN {price.toLocaleString()}</span>
            <div className='flex gap-1 md:gap-3 items-center border border-black/30 rounded-md w-fit h-1/2  md:py-4 mx-[5%] px-2 md:px-3'>
                <span className='text-base md:text-lg max-w-sm'>{quantity}</span>
                <div className='flex flex-col justify-center '>
                    <RxCaretUp className='cursor-pointer' size={20} onClick={() => handleIncrement(_id)} />
                    <RxCaretDown className='cursor-pointer' size={20} onClick={() => handleDecrement(_id)} />
                </div>
            </div>
            <span className='md:px-4 px-1'>NGN {subtotal.toLocaleString()}</span>
        </div>
    );
}
export default CartItem;
