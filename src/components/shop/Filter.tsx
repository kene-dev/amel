import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useGetCategoriesQuery } from '../../features/filter/filterSlice';
import PriceRangeSlider from './RangeSlider';

type FilterProps = {
    handleCategorySelect: (category: string) => void;
    selectedCategory: string;
    handlePriceChange: (min: number, max: number) => void;
    handleReset: (option: string) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Filter({handleCategorySelect, selectedCategory, handlePriceChange, handleReset, handleSearch} : FilterProps) {
    const {data} = useGetCategoriesQuery();



    return (
        <motion.form
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
            className='lg:w-2/5 hidden lg:flex flex-col h-1/2 gap-8 p-12 bg-white rounded-3xl drop-shadow-md'>
            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold font-inter text-xl'>Filter</h1>
                    <button type='reset' onClick={() => handleReset('search')} className='text-just-red hover:cursor-pointer hover:underline'>
                        Reset
                    </button>
                </div>
                <div className='px-4 rounded-xl flex items-center gap-2 bg-gray-100'>
                    <FaSearch color='gray' />
                    <input className='w-full bg-gray-100 p-3 outline-none' type='text'onChange={handleSearch} placeholder='Search Product' />
                </div>
            </div>
            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold font-inter text-xl'>Categories</h1>
                    <button type='reset' onClick={() => handleReset('cat')} className='text-just-red hover:cursor-pointer hover:underline'>
                        Reset
                    </button>
                </div>
                <ul className='space-y-2'>
                    {data?.map((category) => (
                        <li key={category.name} className='flex justify-between items-center'>
                            <span className='text-base text-gray-600'>
                                {category.name} <span>{(category.productCount)}</span>
                            </span>
                            <input
                                className='accent-just-red size-4'
                                type='checkbox'
                                name={category.name.toLowerCase()}
                                checked={category.name === selectedCategory}
                                onChange={() => handleCategorySelect(category.name)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className='w-full'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='font-bold font-inter text-xl'>Price Range</h1>
                </div>
                <PriceRangeSlider min={0} max={100000} step={1} onChange={handlePriceChange} />
            </div>
        </motion.form>
    );
}

export default Filter;
