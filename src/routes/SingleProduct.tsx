import { HiMinus, HiPlus } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { ProductCard, Rating } from '../components/shop';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useState } from 'react';
import { FaTruckFast } from 'react-icons/fa6';
import { GrUpdate } from 'react-icons/gr';
import { Link, useParams } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useGetProductByIdQuery, useGetProductsQuery } from '../features/product/productApiSlice';
import { CartPayload } from '../utils/types';


function SingleProduct() {
    const [isLiked, setIsLiked] = useState(false);
    const { id } = useParams();
    const {data} = useGetProductsQuery({page:1})
    const {data: singleProduct} = useGetProductByIdQuery(id)
    
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity >= 1) setQuantity(quantity - 1);
    };

    // ITEM ADDED TO CART
    const cartItem: CartPayload = {
        _id: singleProduct?._id ?? "",
        name: singleProduct?.name ?? "",
        price: singleProduct?.price ?? 0,
        images: singleProduct?.images ?? [],
        quantity
    }

    return (
        <motion.section
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
            className='p-6 md:grid grid-cols-2 '>
            {/* product Image */}
                <div className='flex items-center justify-center mb-4 md:mb-0'>
                    <img className='max-w-md md:max-w-lg' src={singleProduct?.images[0]} />
                </div>

            {/* product details */}
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold font-inter text-base md:text-2xl capitalize'>{singleProduct?.name}</h1>
                        <span className='flex items-center gap-2'>
                            <Rating rating={5} readonly />
                            <p className='text-gray-400'>
                                ({88} reviews){' '}
                                {singleProduct?.stock ? (
                                    <span className='border-l border-black px-2 text-green-400'>In stock</span>
                                ) : (
                                    <span className='border-l border-black px-2 text-red-400'>Out stock</span>
                                )}
                            </p>
                        </span>
                    </div>
                    <p className='text-xl md:text-3xl font-inter'>NGN {singleProduct?.price.toLocaleString()}</p>
                    <p className='max-w-md '>
                       {singleProduct?.description}
                    </p>
                    <div className='border border-gray-700 max-w-md mt-2'></div>
                    <div className='flex flex-col gap-4 max-w-md '>
                        <div className='flex items-center gap-6'>
                            <div className='rounded-md h-10 w-1/3 flex  border border-gray-600 divide-x divide-gray-600'>
                                <button onClick={handleDecrement} className='w-1/3 flex items-center justify-center px-2' type='button'>
                                    <HiMinus size={20}  />
                                </button>
                                <span className='w-1/3 font-medium text-base md:text-lg flex items-center justify-center'>{quantity}</span>
                                <button onClick={handleIncrement} className='flex items-center justify-center w-1/3  bg-red-500 text-white rounded-e-md' type='button'>
                                    <HiPlus size={20}  />
                                </button>
                            </div>
                            <Link to='/cart'>
                                <button
                                    className='py-2 px-6 flex items-center justify-center hover:bg-red-600 hover:scale-105 transition-all ease-in-out duration-200 font-medium bg-red-500 text-white rounded-md'
                                    type='button'
                                    onClick={() => dispatch(addToCart(cartItem))}
                                    >
                                    Buy Now
                                </button>
                            </Link>
                            <div className='border border-black p-2 rounded-md'>
                                <button onClick={() => setIsLiked(!isLiked)} className='relative w-6 h-6 flex items-center justify-center'>
                                    <span className={`absolute transition-all duration-200 transform ${isLiked ? 'scale-0' : 'scale-100'}`}>
                                        <GoHeart size={26} />
                                    </span>
                                    <span className={`absolute transition-all duration-200 transform ${isLiked ? 'scale-100' : 'scale-0'}`}>
                                        <GoHeartFill fill='red' size={26} />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className='border border-black rounded-2xl  divide-y divide-black space-y-4'>
                            <div className='flex gap-4 items-center py-2 px-4'>
                                <FaTruckFast size={34} />
                                <span>
                                    <h4 className='font-medium text-base'>Free Delivery</h4>
                                    <span className='underline text-sm cursor-pointer'>Enter your postal code for Delivery Availability</span>
                                </span>
                            </div>
                            <div className='flex gap-4 items-center py-3 px-4'>
                                <GrUpdate size={26} />
                                <span>
                                    <h4 className='font-medium text-base'>Free Delivery</h4>
                                    <span className='text-sm'>
                                        Free 30 Days Delivery Returns. <span className='underline cursor-pointer'>Details</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
       
            {/* related items */}
            <div className='col-span-2 mt-12 space-y-6 md:space-y-16'>
                <div className='flex gap-2 items-center'>
                    <div className='px-2 py-4 rounded bg-red-600'></div>
                    <h4 className='font-semibold text-just-red capitalize'>Related items</h4>
                </div>
                <div className='flex gap-6 items-center overflow-x-auto w-full'>
                    {data?.products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
export default SingleProduct;
