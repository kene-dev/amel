import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDispatch} from 'react-redux';
import { useGetCategoriesQuery } from '../../features/filter/filterSlice';
import PriceRangeSlider from './RangeSlider';

type FilterProps = {
    handleCategorySelect: (category: string) => void;
    selectedCategory: string;
    handlePriceChange: (min: number, max: number) => void;
    handleReset: (option: string) => void
}

function MobileFilter({handleCategorySelect, selectedCategory, handlePriceChange, handleReset} : FilterProps) {
    const dispatch = useDispatch();
     const {data} = useGetCategoriesQuery();
    // const { filterState } = useSelector((state: RootState) => state.products);
    // const categories = useSelector((state: RootState) => {
    //     const allProducts = state.products.products;

    //     return [
    //         { name: 'Baking', count: allProducts.filter((p) => p.category === 'Baking Products').length },
    //         { name: 'Breakfast', count: allProducts.filter((p) => p.category === 'Breakfast').length },
    //         { name: 'Uncategorized', count: allProducts.filter((p) => p.category === 'Uncategorized').length }
    //     ];
    // });
    // const maxPrice = Math.max(...useSelector((state: RootState) => state.products.products.map((p) => p.price)));

    // const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     dispatch(updateSearchTerm(value));
    // };

    // const handleChange = ([min, max]: [number, number]) => {
    //     dispatch(updatePriceRange([min, max]));
    // };

    // const handleReset = () => {
    //     dispatch(resetFilters());
    // };

    // const handleCategoryToggle = (categoryName: string) => {
    //     dispatch(toggleCategory(categoryName));
    // };
    return (
        <motion.form
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
            className='absolute w-[300px] z-40 flex xl:hidden flex-col h-fit gap-8 p-10  bg-white rounded-3xl drop-shadow-md mx-3 xl:mx-6'>
            <div className='space-y-2 xl:space-y-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold font-inter text-lg '>Filter</h1>
                    {/* <button type='reset' className='text-just-red hover:cursor-pointer hover:underline' onClick={handleReset}>
                        Reset
                    </button> */}
                </div>
                <div className='px-4 rounded-xl flex items-center gap-2 bg-gray-100'>
                    <FaSearch color='gray' />
                    {/* <input
                        className='w-full text-sm md:text-base bg-gray-100 p-1 xl:p-3 outline-none'
                        type='text'
                        placeholder='Search Product'
                        value={filterState.searchTerm}
                        onChange={handleSearchValue}
                    /> */}
                </div>
            </div>
            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold font-inter text-lg '>Categories</h1>
                    <button type='reset' onClick={() => handleReset('cat')} className='text-just-red hover:cursor-pointer hover:underline'>
                        Reset
                    </button>
                </div>
                <ul className='space-y-2'>
                    {data?.map((category) => (
                        <li key={category.name} className='flex justify-between items-center'>
                            <span className='text-base text-gray-600'>
                                {category.name} ({category.productCount})
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
            <div>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='font-bold font-inter text-lg '>Price Range</h1>
                </div>
                <PriceRangeSlider min={0} max={100000} step={1} onChange={handlePriceChange} />
            </div>
        </motion.form>
    );
}
export default MobileFilter;
