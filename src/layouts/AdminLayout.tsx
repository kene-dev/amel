import { Link, Outlet, ScrollRestoration } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MobileNav, Sidebar } from '../components/admin';
import { FaFileUpload } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { toggleForm } from '../features/admin/adminProductSlice';
import { Logo } from '../components';

function AdminLayout() {
    const [preview, setPreview] = useState<string | null>(null);
    const dispatch = useDispatch();
    const isOpen = false;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            dispatch(toggleForm());
        }
    };

    return (
        <section className='grid xl:grid-cols-4 place-items-center bg-[#F5F4F0] h-screen overflow-auto'>
            <Sidebar />
            <div className='flex xl:hidden p-4 items-center justify-center'>
                <Link to='/admin'>
                    <Logo />
                </Link>
            </div>
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 20,
                    duration: 1.5,
                    staggerChildren: 0.2
                }}
                className='container col-span-3 py-6 xl:py-12 px-5 xl:px-10'>
                <ScrollRestoration />
                <Outlet />
                <MobileNav />
            </motion.main>
            {isOpen && (
                <motion.section
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='fixed w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 md:px-0'
                    onClick={handleOverlayClick}>
                    <form action='post' className='space-y-4 md:w-1/2 xl:w-1/3 bg-white rounded shadow-md px-6 py-8'>
                        <div className='space-y-1'>
                            <label htmlFor='category'>Category</label>
                            <select id='category' className='capitalize px-3 py-2 w-full border border-black rounded-lg bg-white' required>
                                <option value='baking-products'>Baking products</option>
                                <option value='breakfast-products'>Breakfast products</option>
                            </select>
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='product-name'>Product Name</label>
                            <input
                                className=' px-3 py-2 w-full border border-black rounded-lg bg-white focus:outline focus:outline-primary'
                                type='text'
                                placeholder='Type here'
                                name='product-name'
                                id='product-name'
                            />
                        </div>
                        <div className='flex items-center gap-3 w-full'>
                            <div className='space-y-1'>
                                <label htmlFor='product-price'>Price</label>
                                <div className='flex items-center px-3 py-2 max-w-1/2 border border-black rounded-lg bg-white focus-within:outline focus-within:outline-primary'>
                                    <input className='w-full outline-none' type='text' placeholder='Type here' name='product-price' id='product-price' />
                                    <p className='text-just-red'>NGN</p>
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <label htmlFor='product-quantity'>Quantity</label>
                                <input
                                    className=' px-3 py-2 w-full border border-black rounded-lg bg-white focus:outline focus:outline-primary'
                                    type='number'
                                    min={0}
                                    placeholder='Type here'
                                    name='product-quantity'
                                    id='product-quantity'
                                />
                            </div>
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='product-description'>Description</label>
                            <textarea
                                className='resize-none px-3 py-2 w-full border border-black rounded-lg bg-white focus:outline focus:outline-primary'
                                placeholder='Type here'
                                name='product-description'
                                id='product-description'
                                rows={5}></textarea>
                        </div>
                        <div>
                            <h3>Media</h3>
                            <p className='text-gray-500'>
                                Upload picture of your logo (<span className='text-just-red'>5mb max</span>)
                            </p>
                            <div className='flex items-center gap-4 flex-wrap w-full py-4'>
                                {preview && <img src={preview} alt='Product Preview' className='size-12 object-cover rounded-lg ' />}
                                <label htmlFor='product-image-upload' className='text-white bg-black/35 p-4 rounded-lg flex items-center gap-2 cursor-pointer'>
                                    {preview ? <FaPlus fill='gray' /> : <FaPlus />}
                                </label>
                                <input type='file' onChange={handleFileChange} accept='image/*' className='hidden' id='product-image-upload' />
                            </div>
                        </div>
                        <button className='text-white bg-just-red py-2 px-3 rounded-lg flex items-center gap-2'>
                            <FaFileUpload /> Upload Product
                        </button>
                    </form>
                </motion.section>
            )}
        </section>
    );
}
export default AdminLayout;
