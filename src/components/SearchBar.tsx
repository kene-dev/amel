import { RiSearchLine } from 'react-icons/ri';
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';

function SearchBar() {
    const cartTotal = useSelector((state: RootState) => state.cart.totalQuantity);
    return (
        <section className='flex flex-col items-end'>
            <div className='flex bg-black text-gray-300 divide-gray-500 divide-x  p-2 rounded-2xl'>
                <div className='flex  items-center px-2'>
                    <RiSearchLine fill='#FECC00' size={24} />
                    <input className='mx-1 p-2 outline-none focus:ring-1 rounded-xl ring-primary bg-transparent w-[222px]' placeholder='Search' type='text' name='search' />
                </div>
                <div className='md:min-w-16 p-2 flex items-center justify-center'>
                    <Link to='cart'>
                        <Cart />
                    </Link>
                    <div className='size-6 flex items-center justify-center font-varela text-sm shadow text-white bg-just-red z-[1] rounded-lg mt-[-55px] mr-[-30px]'>
                        {cartTotal}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default SearchBar;
