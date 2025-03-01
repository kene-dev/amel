import { MdModeEdit } from 'react-icons/md';
import { motion } from 'framer-motion';
import image from '../../assets/webp/Icing_sugar.webp';

function ProductItem() {
    return (
        <>
            <motion.tr initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='bg-white'>
                <td className='text-center px-2'>
                    <input className='accent-just-red' type='checkbox' name='select-all' />
                </td>
                <td>
                    <p className='flex  items-center justify-center capitalize'>Breakfast Products</p>
                </td>
                <td className='text-center'>
                    <div className='flex justify-center items-center py-2'>
                        <img className='size-8 object-cover' src={image} />
                    </div>
                </td>
                <td className='text-center'>Icing Sugar</td>
                <td className='text-center'>NGN 500,000</td>
                <td>
                    <div className='flex items-center justify-center'>10</div>
                </td>
                <td>
                    <div className='flex justify-center items-center'>
                        <button className='bg-orange-400 text-white flex items-center gap-1  rounded-md text-sm px-3 py-1'>
                            <MdModeEdit /> Edit
                        </button>
                    </div>
                </td>
            </motion.tr>
            <div className='py-1'></div>
        </>
    );
}
export default ProductItem;
