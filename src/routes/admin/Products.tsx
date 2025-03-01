import { CgAddR } from 'react-icons/cg';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { RiSearch2Line } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { ProductItem } from '../../components/admin';
import { toggleForm } from '../../features/admin/adminProductSlice';
import { useDispatch } from 'react-redux';
import image from '../../assets/webp/Icing_sugar.webp';

function Products() {
    const products = [
        { id: 1, category: 'Breakfast Products', name: 'Icing Sugar', price: 'NGN 500,000', quantity: 10 },
        { id: 2, category: 'Dairy Products', name: 'Milk Powder', price: 'NGN 200,000', quantity: 5 }
    ];
    const dispatch = useDispatch();
    return (
        <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='space-y-6 h-screen xl:mt-12 flex flex-col'>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex md:flex-row flex-col gap-4 md:justify-between'>
                <div className='flex items-center md:justify-start justify-between gap-3 md:gap-6 '>
                    <h1 className='text-xl xl:text-3xl'>Product List</h1>
                    <div className=' max-w-[50%] md:max-w-sm md:px-4 px-2  text-sm md:text-base flex items-center border border-gray-400 rounded-3xl bg-transparent w-fit py-2'>
                        <input className='bg-transparent outline-none indent-2 w-[90%] md:w-auto' type='text' placeholder='Search Product' name='search' />
                        <RiSearch2Line size={20} />
                    </div>
                </div>
                <div className='flex  items-center  md:justify-end gap-2 md:gap-4'>
                    <select className=' capitalize bg-white px-3 py-2 rounded-xl cursor-pointer flex justify-center items-center gap-2  text-xs md:text-base' name='category'>
                        <option value='all-products'>All products</option>
                        <option value='some-products'>Some products</option>
                    </select>
                    <button
                        className='rounded-xl cursor-pointer transition-all ease-in-out duration-300 hover:bg-black/90 hover:shadow-md flex items-center gap-2 text-xs md:text-base px-3 py-2  bg-black text-white'
                        type='button'
                        onClick={() => dispatch(toggleForm())}>
                        <CgAddR size={20} /> Add product
                    </button>
                    <button
                        className='rounded-xl cursor-pointer transition-all ease-in-out duration-300 hover:bg-red-700 hover:shadow-md flex items-center gap-2  text-xs md:text-base px-3 py-2  bg-just-red text-white'
                        type='button'>
                        <MdDelete size={20} /> Delete
                    </button>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='overflow-auto max-h-[90%] flex-1 hidden md:block'>
                <motion.table initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='w-full'>
                    <motion.thead initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <motion.tr initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='capitalize'>
                            <th className='font-bold text-gray-600 pb-4'>
                                <input className='accent-just-red' type='checkbox' name='select-all' />
                            </th>
                            <th className=' text-gray-500 pb-4 font-semibold'>Category</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>Image</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>Product Name</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>Price</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>Quantity</th>
                            <th className=' text-gray-500 pb-4 font-semibold'>Action</th>
                            <div className='flex justify-center  items-center'>
                                <button type='button' className='text-gray-500 hover:bg-gray-50 hover:shadow-sm bg-white  rounded-full text-sm py-1  px-2'>
                                    Sort by
                                </button>
                            </div>
                        </motion.tr>
                    </motion.thead>
                    <motion.tbody initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                    </motion.tbody>
                </motion.table>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='md:hidden block space-y-4 px-4 pb-24'>
                {products.map((product) => (
                    <div key={product.id} className='bg-white shadow-md rounded-lg p-4 border'>
                        <div className='flex justify-between items-center mb-3'>
                            <span className='font-semibold text-sm capitalize'>{product.category}</span>
                            <input className='accent-just-red' type='checkbox' />
                        </div>
                        <div className='flex justify-center mb-4'>
                            <img className='w-20 h-20 object-cover rounded-md' src={image} alt={product.name} />
                        </div>
                        <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Product Name</span>
                                <span>{product.name}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Price</span>
                                <span>{product.price}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Quantity</span>
                                <span>{product.quantity}</span>
                            </div>
                        </div>
                        <button className='w-full mt-4 bg-orange-400 text-sm text-white py-2 rounded-md hover:bg-orange-500 transition-colors flex items-center justify-center gap-2'>
                            <MdModeEdit />
                            Edit
                        </button>
                    </div>
                ))}
            </motion.div>
        </motion.section>
    );
}
export default Products;
