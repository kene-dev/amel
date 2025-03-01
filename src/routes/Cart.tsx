import { useSelector } from 'react-redux';
import { BreadCrumbs, Button, CartItem } from '../components';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Cart() {
    const cartProducts = useSelector((state: RootState) => state.cart.cartItems);
    const cartTotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalAmount = cartTotal + 0;

    return (
        <motion.section
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
            className=' py-4 px-2 md:px-8 space-y-6 md:space-y-4'>
            <BreadCrumbs />
            <table className='table-auto w-full'>
                <div className='rounded-lg bg-white drop-shadow '>
                    <thead className='grid grid-rows-1 grid-cols-4 '>
                        <th className='p-4 font-medium text-start'>Product</th>
                        <th className='p-4 font-medium text-start'>Price</th>
                        <th className='p-4 font-medium text-start'>Quantity</th>
                        <th className='p-4 font-medium text-start'>Subtotal</th>
                    </thead>
                </div>
                <tbody className='flex flex-col justify-around h-full gap-4 my-4'>
                    {cartProducts.length > 0 ? (
                        cartProducts.map((product) => (
                            <CartItem
                                _id={product._id}
                                image={product.images[0]}
                                name={product.name}
                                price={product.price}
                                quantity={product.quantity}
                                subtotal={product.price * product.quantity}
                            />
                        ))
                    ) : (
                        <p className='text-center w-full py-3 text-lg tracking-wide'>Your Cart is Empty!</p>
                    )}
                </tbody>
            </table>
            <div className='flex w-full justify-between'>
                <Link to='/shop'>
                    <button
                        className='md:px-4 px-3 py-2 font-medium md:text-base text-sm border  border-gray-600 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all ease-in-out duration-300'
                        type='button'>
                        Return to shop
                    </button>
                </Link>
                <button
                    className='md:px-4 px-3 py-2 font-medium md:text-base text-sm border  border-gray-600 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all ease-in-out duration-300'
                    type='button'>
                    Update Cart
                </button>
            </div>
            <div className='flex md:flex-row flex-col justify-end gap-6 mt-10'>
                {/* <div className='flex flex-wrap h-fit items-start gap-2'>
                    <input className='px-4 py-2 rounded-lg border outline-none focus:ring-1 ring-black border-gray-600' type='text' placeholder='Coupon Code' />
                    <button className='md:px-4 px-3 py-2 text-sm md:text-base borde1750r text-white font-medium  bg-just-red rounded-lg hover:bg-red-600 hover:scale-105 transition-all ease-in-out duration-300'>
                        Apply Coupon
                    </button>
                </div> */}
                <div className='w-full max-w-lg  drop-shadow-md bg-white px-6 py-4'>
                    <h1 className='text-lg md:text-xl mb-4 font-medium'>Cart Total</h1>
                    <div className='space-y-4 divide-y divide-black '>
                        <span className='flex justify-between  items-center'>
                            <p className='text-base md:text-lg'>Subtotal:</p>
                            <p>NGN {cartTotal.toLocaleString()}</p>
                        </span>
                        <span className='flex justify-between  items-center'>
                            <p className='text-base md:text-lg mt-2'>Shipping:</p>
                            <p>Free</p>
                        </span>
                        <span className='flex justify-between items-center'>
                            <p className='text-base md:text-lg mt-2'>Total:</p>
                            <p>NGN {totalAmount.toLocaleString()}</p>
                        </span>
                    </div>
                    <div className='flex justify-center items-center  py-4'>
                        {cartProducts.length > 0 ? (
                            <Link to='checkout'>
                                <Button theme='red' text='Proceed to checkout' />
                            </Link>
                        ) : (
                            <Button theme='red' text='Cart is empty!' />
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
export default Cart;
