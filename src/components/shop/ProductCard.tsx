import { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';
interface ProductCardProps {
    _id: string;
    name: string;
    description?: string;
    price: number;
    discountedPrice: number;
    category: string;
    images: string[];
    stock?: number;
    createdAt?: string;
    updatedAt?: string;
    rating?: number; 
    ratingCount?:number;
    discount?:number
}
function ProductCard({ _id, images, name, rating = 5, ratingCount = 88, discount = 40, price, discountedPrice, }: ProductCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();

    return (
        <article className=''>
            <div className='relative w-[100%] lg:w-[270px] h-auto mb-3 rounded-2xl '>
                <div className='absolute w-full z-[1] p-2 flex items-center justify-between'>
                    <span className='bg-just-red shadow-md text-sm text-white py-1 px-3 rounded'>-{discount}%</span>
                    <button onClick={() => setIsLiked(!isLiked)} className='relative w-6 h-6 flex items-center justify-center'>
                        <span className={`absolute transition-all duration-200 transform ${isLiked ? 'scale-0' : 'scale-100'}`}>
                            <GoHeart size={20} />
                        </span>
                        <span className={`absolute transition-all duration-200 transform ${isLiked ? 'scale-100' : 'scale-0'}`}>
                            <GoHeartFill fill='red' size={20} />
                        </span>
                    </button>
                </div>
                <div className='relative rounded-b-2xl flex justify-center items-center'>
                    <Link to={`/shop/${_id}`}>
                    <div className='w-full lg:max-h-[250px] h-[400px] overflow-hidden'>
                        <img className='w-full h-full object-cover aspect-auto' src={images[0]} />
                    </div>
                    </Link>
                    <button
                        className='opacity-0 hover:opacity-100 transition-all duration-700 ease-out absolute rounded-b-2xl bottom-0 bg-black text-white font-medium text-lg w-full py-2'
                        onClick={() => dispatch(addToCart({ _id, images, name, price, quantity : 1 }))}>
                        Add to cart
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-[2px]'>
                <Link to={`/shop/${_id}`}>
                    <h1 className='font-medium text-xl md:text-lg text-center lg:text-left'>{name}</h1>
                </Link>
                <div className='flex gap-2 items-center justify-center lg:justify-start '>
                    <span className='font-medium text-sm md:text-base text-red-500'>N{price}</span>
                    <span className='font-medium text-sm md:text-base line-through text-gray-500'>N{discountedPrice}</span>
                </div>
                <div className='flex items-center gap-2 justify-center lg:justify-start'>
                    <Rating rating={rating} readonly />
                    <p className='text-gray-400  text-sm md:text-base font-medium'>({ratingCount})</p>
                </div>
            </div>
        </article>
    );
}
export default ProductCard;
