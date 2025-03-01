import bgImage from '../../assets/webp/home_about_us_bg.webp';
import image from '../../assets/webp/female_dp.webp';
import AvatarContainer from '../AvatarContainer';
import Logo from '../Logo';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import logo from '../../assets/svgs/logo.svg';

function About() {
    const section1 = useRef(null);
    const sectionInview = useInView(section1, { once: true });
    return (
        <section className='px-8'>
            <motion.div
                ref={section1}
                initial={{ x: -100, opacity: 0 }}
                animate={sectionInview ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className='flex flex-col xl:flex-row justify-center  items-center xl:items-end gap-3 md:gap-5 xl:gap-20 py-10 xl:py-20 px-2'>
                <div className='md:w-full text-center xl:text-start'>
                    <h4 className='mb-2 text-just-red uppercase font-medium text-lg tracking-wider'>About us</h4>
                    <h1 className='font-semibold text-2xl md:text-4xl'>Crafting Quality,</h1>
                    <h1 className='font-semibold text-2xl md:text-4xl'>Inspiring Nourishment</h1>
                </div>
                <p className='md:text-lg max-w-3xl text-center md:text-justify'>
                    Founded on a passion for excellence, Amel Susan has become Nigeria’s leading name in breakfast cereals and baking ingredients. Our Journey began with a simple
                    mission to create nutritious, high-quality products that bring joy to every meal.
                </p>
            </motion.div>
            <div className='py-16 md:py-20 px-8 w-full' style={{ background: `url(${bgImage}) no-repeat`, backgroundSize: 'cover' }}>
                <motion.div
                    ref={section1}
                    initial={{ y: -50, opacity: 0 }}
                    animate={sectionInview ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className='flex justify-center'>
                    <div className='flex flex-col justify-center items-center bg-black/70 border-2 border-[#FECC00]/80 p-8 h-40 md:h-48 w-5/6 md:w-1/2 rounded-2xl relative'>
                        <p className='max-w-lg text-center line-clamp-3 text-gray-200 font-medium md:text-lg'>
                            Amel Susan has made breakfast so easy, tasty and yummy for I and my Entire Family
                        </p>
                        <p className='capitalize font-light text-sm md:text-base text-gray-400'> - juliet Robety</p>
                        <img className='md:size-auto  w-[55px] md:w-auto absolute bg-milk -right-7 -bottom-5 p-2 rounded-2xl' src={logo} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
export default About;
