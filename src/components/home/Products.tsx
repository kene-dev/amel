import bgImage from '../../assets/webp/bg_pattern.webp';
import breakfast from '../../assets/svgs/breakfast.svg';
import icing from '../../assets/svgs/baking.svg';
import Button from '../Button';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Products() {
    const firstProduct = useRef(null);
    const firstProductInview = useInView(firstProduct, { once: true });

    const secondProduct = useRef(null);
    const secondProductInview = useInView(secondProduct, { once: true });

    return (
        <section className='flex flex-col lg:flex-row'>
            <div className=' bg-[#FDCB00] w-full '>
                <motion.div
                    ref={firstProduct}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={firstProductInview ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className='z-[1] flex flex-col xl:flex-row gap-2 md:gap-6 xl:gap-12 justify-center items-center py-4 xl:py-12'
                    style={{ background: `url(${bgImage})` }}>
                    <div className='order-2 xl:order-1 flex items-center md:items-start flex-col gap-1 xl:gap-4'>
                        <p className='font-semibold text-xl md:text-3xl xl:text-4xl'>Breakfast</p>
                        <p className='font-semibold text-xl md:text-3xl xl:text-4xl'>Products</p>
                        <Link to='product-catalogue'>
                            <Button theme='red' text='Learn More' />
                        </Link>
                    </div>
                    <div className='order-1 xl:order-2 flex md:block justify-center'>
                        <img className='size-2/3 md:w-[400px] md:h-[400px]' src={breakfast} />
                    </div>
                </motion.div>
            </div>
            <div className=' bg-just-red w-full'>
                <motion.div
                    ref={secondProduct}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={secondProductInview ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className='z-[1] flex flex-col xl:flex-row gap-2 md:gap-6 xl:gap-12 justify-center items-center py-4 xl:py-12'
                    style={{ background: `url(${bgImage})` }}>
                    <div className='order-2 xl:order-1 flex items-center md:items-start flex-col gap-1 xl:gap-4'>
                        <p className='font-semibold text-xl md:text-3xl xl:text-4xl'>Baking</p>
                        <p className='font-semibold text-xl md:text-3xl xl:text-4xl'>Products</p>
                        <Link to='product-catalogue'>
                            <Button theme='yellow' text='Learn More' />
                        </Link>
                    </div>
                    <div className='order-1 xl:order-2 flex md:block justify-center'>
                        <img className='size-2/3 md:w-[400px] md:h-[400px]' src={icing} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
export default Products;
