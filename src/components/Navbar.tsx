import Logo from './Logo';
import { links } from '../utils/links';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import AvatarContainer from './AvatarContainer';
import image from '../assets/webp/female_dp.webp';
import { RiSearchLine } from 'react-icons/ri';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { useState } from 'react';
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useGetSingleUserQuery } from '../features/auth/authApiSlice';
import { FaUser } from "react-icons/fa";

type Link = {
    path: string;
    name: string;
};

function Navbar() {
      const {data} = useGetSingleUserQuery()
    const cartTotal = useSelector((state: RootState) => state.cart.totalQuantity);
    const [isOpen, setIsOpen] = useState(false);
    const isAdmin = data?.roles?.includes('admin')

    return (
        <>
            {/* Desktop nav */}
            <nav className='hidden xl:flex justify-around  items-center gap-4 bg-milk px-8 py-6'>
                <Link to='/'>
                    <Logo />
                </Link>
                <ul className='basis-[40%] mx-auto flex items-center  justify-around '>
                    
                    {isAdmin ? links.map((link: Link) => {
                        const { path, name } = link;
                        return (
                            <li key={path}>
                                <NavLink
                                    className={({ isActive, isPending }) =>
                                        isPending ? '' : isActive ? 'text-black font-bold capitalize text-lg' : 'capitalize text-lg text-black/70'
                                    }
                                    to={path}
                                    end>
                                    {name}
                                </NavLink>
                            </li>
                        );
                    }) : links.slice(0,5).map((link: Link) => {
                        const { path, name } = link;
                        return (
                            <li key={path}>
                                <NavLink
                                    className={({ isActive, isPending }) =>
                                        isPending ? '' : isActive ? 'text-black font-semibold capitalize text-lg' : 'capitalize text-lg text-black/70'
                                    }
                                    to={path}
                                    end>
                                    {name}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <SearchBar />
                <Link to='account'>
                    <div className='rounded-full size-10 md:size-14 shadow-inner bg-black flex items-center justify-center cursor-pointer text-white'>
                    {data ? 
                    <p className='text-2xl'>{data.firstName.slice(0,1)} {data.lastName.slice(0,1)} </p> : <FaUser className=' size-7' />
                    }
                    </div>
                </Link>
            </nav>

            {/* Mobile nav*/}
            <nav className='xl:hidden  flex justify-between  items-center gap-4 bg-milk px-2 py-3'>
                <Link to='/'>
                    <Logo />
                </Link>
                <div className=' flex justify-center items-center w-fit'>
                    <RiSearchLine fill='#FECC00' size={18} />
                    <input
                        className='mx-1 my-2 p-1 text-sm  focus:outline outline-1 rounded-xl outline-primary bg-transparent w-1/2 md:w-full'
                        placeholder='Search'
                        type='text'
                        name='search'
                    />
                </div>
                <div className='z-50'>
                    {isOpen ? (
                        <IoCloseOutline className='cursor-pointer' size={30} onClick={() => setIsOpen(!isOpen)} />
                    ) : (
                        <IoMenuOutline className='cursor-pointer' size={30} onClick={() => setIsOpen(!isOpen)} />
                    )}
                </div>
            </nav>
            {/* backdrop */}
            {isOpen && <div className='fixed top-0 z-30 opacity-75 backdrop-blur-sm bg-black/70 w-screen h-screen'></div>}

            {/* dropdown menu */}
            {isOpen && (
                <div className='fixed top-0 z-50 md:w-1/2 w-3/4 h-screen px-1 bg-milk'>
                    <ul className='flex flex-col p-2 gap-1'>
                        {links.map((link: Link) => {
                            const { path, name } = link;
                            return (
                                <li key={path}>
                                    <NavLink
                                        onClick={() => setIsOpen(!isOpen)}
                                        className={({ isActive, isPending }) =>
                                            isPending ? '' : isActive ? 'text-black font-semibold capitalize text-lg' : 'capitalize text-lg text-black/70'
                                        }
                                        to={path}
                                        end>
                                        {name}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    <div className='flex gap-3 items-center px-2 py-3'>
                        <div className='md:min-w-20 flex items-center justify-center'>
                            <div className='bg-black p-2   rounded-xl cursor-pointer'>
                                <Link to='cart'>
                                    <Cart />
                                </Link>
                            </div>
                            <span className='size-6 flex items-center justify-center font-varela text-xs shadow text-white bg-just-red z-[1] rounded-lg mt-[-35px] ml-[-8px]'>
                                {cartTotal}
                            </span>
                        </div>
                        <Link to='account'>
                            <AvatarContainer image={image} />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
export default Navbar;
