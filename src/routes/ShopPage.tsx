import { HeroContainer } from '../components';
import image from '../assets/svgs/shop_hero_image.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, MobileFilter, ProductCard } from '../components/shop';
import { useState } from 'react';
import { RiListSettingsLine } from 'react-icons/ri';
import { useGetProductsQuery } from '../features/product/productApiSlice';
import useDebounce from '../components/hooks/useDebounce';
import { MdCancel } from "react-icons/md";

function ShopPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [PriceRange, setPriceRange] = useState<[number, number]>([0,100000])
    const [search, setSearch] = useState<string>('');

    // Debounced value (waits 500ms before applying changes)
    const debouncedPriceRange = useDebounce(PriceRange);
    const debouncedSearch = useDebounce(search);

    const {data} = useGetProductsQuery({page:1, category: selectedCategory, minPrice:debouncedPriceRange[0], maxPrice:debouncedPriceRange[1], search:debouncedSearch})

    const handleCategorySelect = (catName: string) => {
        setSelectedCategory(catName)
    }

    const handlePriceChange = (min: number, max: number) => {
        setPriceRange([min, max])
      };

    const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    };

      const handleReset = (option: string) => {
        if(option === 'search'){
            setSearch('')
        }else if(option === 'cat'){
            setSelectedCategory('')
        }else{
            console.log('Nothing to Reset')
        }
    };

      const cardAnimate = {
        offScreen: { y: 100, opacity: 0 },
        onScreen: (i: number) => ({
          y: 0,
          opacity: 1,
          transition: {duration: 1.5, type: "spring", delay: i * 0.3 },
        }),
      };

    
    return (
        <div className='w-full'>
            <div className='bg-milk h-48'></div>
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
                    className='-mt-44 flex items-center justify-center'>
                    <HeroContainer
                        theme='black'
                        title='Shop'
                        subHeading='All  our products in one place '
                        content='From bustling urban centers to serene rural areas, our goal is to make our nutritious cereals and baking ingredients accessible to every Nigerian household.'
                        imageSrc={image}
                        buttonLabel='Product Catalogue'
                        linkTo='/product-catalogue'
                    />
                </motion.div>
            <div className='bg-white py-16 flex gap-5'>
                <Filter 
                handleCategorySelect={handleCategorySelect} 
                selectedCategory={selectedCategory} 
                handlePriceChange={handlePriceChange}
                handleReset={handleReset}
                handleSearch={handleSearchValue}
                />
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
                    className='relative'>
                    <button
                        className='-mt-9 mx-4 absolute z-50 flex lg:hidden items-center gap-1 bg-slate-800 font-inter text-sm font-semibold text-white px-3 py-1 rounded drop-shadow-md'
                        onClick={() => setIsOpen(!isOpen)}>
                        <RiListSettingsLine />
                        Filter
                    </button>
                </motion.div>
                {isOpen && 
                <MobileFilter
                handleCategorySelect={handleCategorySelect} 
                selectedCategory={selectedCategory} 
                handlePriceChange={handlePriceChange}
                handleReset={handleReset}
                />}
                
                {data?.products.length  ? (
                    <motion.div
                        layout
                        className='w-full flex flex-wrap lg:justify-start md:justify-evenly gap-10 md:gap-4'>
                            <AnimatePresence mode='sync'>
                                {data?.products.map((product, index) => (
                                    <motion.div
                                    layout
                                    variants={cardAnimate}
                                    initial='offScreen'
                                    // whileInView="onScreen"
                                    animate="onScreen"
                                    viewport={{once: true, amount:0.1}}
                                    exit={{x:-200, opacity:0}}
                                    transition={{duration:.3, ease:"linear"}}
                                    key={index}
                                    custom={index}
                                    className=''
                                    >
                                    <ProductCard key={index} {...product} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                         exit={{x:-200, opacity:0}}
                         className='w-full flex flex-col justify-center gap-4 items-center mx-auto text-xl font-semibold'> 
                            <MdCancel className='w-10 h-10 text-[#E31E24]' />  
                            No products found!
                        </motion.p>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
export default ShopPage;
