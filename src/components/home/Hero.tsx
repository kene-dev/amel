import { motion } from 'framer-motion';
import { FaCircleArrowRight } from 'react-icons/fa6';
import heroImage from '../../assets/webp/hero_image.webp';
import icing from '../../assets/webp/Icing_sugar.webp';
import coco from '../../assets/svgs/coco.svg';
import point from '../../assets/svgs/point.svg';
import bananaImage from '../../assets/png/banana.png';
import milkImage from '../../assets/webp/milk.webp';
import vanillaImage from '../../assets/webp/vanilla.webp';
import CustomArrow from '../CustomArrow';
import FlavorsContainer from './FlavorsContainer';
import { Link } from 'react-router-dom';
import {  FaCircleArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from 'react';
interface Slide {
    title1: string;
    title2: string;
    description: string;
    image: string;
  }
  
  const slides: Slide[] = [
    {
      title1: "Shop Our Amel Susan",
      title2: "Products Today",
      description: "From Breakfast to Baking Products! We’ve got you covered.",
      image:heroImage,
    },
    {
      title1: "We Are Every Baker's Delight",
      title2: "",
      description: "Banana, Vanilla, and Milk flavors available.",
      image: icing,
    },
    {
      title1: "Quality & Freshness",
      title2: "In Every Bite",
      description: "Enjoy premium quality products delivered to your door.",
      image: coco,
    },
  ];
const Hero = () => {
        const [currentSlide, setCurrentSlide] = useState(0);
    
        const nextSlide = () => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        };
      
        // const prevSlide = () => {
        //   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        // };
      
        // Auto-slide effect every 5 seconds
        useEffect(() => {
          const interval = setInterval(nextSlide, 5000);
          return () => clearInterval(interval);
        }, []);
    return  (
        <section className='relative w-full h-[600px] overflow-hidden flex flex-col items-center justify-center xl:flex-row bg-milk'>
            {/* <div className='order-2 xl:order-1 flex  items-center justify-center'>
                <div className='md:flex xl:block py-6 xl:py-0 gap-6 justify-between  space-y-2 xl:space-y-3 '>
                    <div className='md:space-y-2 xl:space-y-3 '>
                        <h1 className='font-varela text-2xl md:text-3xl xl:text-5xl font-extrabold tracking-wide'>Shop Our Amel Susan </h1>
                        <h1 className='font-varela text-2xl md:text-3xl xl:text-5xl font-bold tracking-wide'>Products Today </h1>
                        <p className='text-just-gray text-lg md:text-xl max-w-sm'>From Breakfast to Baking Products! We’ve got you covered.</p>
                        <CustomArrow />
                    </div>
                    <div className='flex items-center'>
                        <Link to='shop'>
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                                    transition: { type: 'spring', stiffness: 300, damping: 15, duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className='bg-black  py-2 md:py-3 px-4 md:px-6 rounded-xl tracking-wide text-lg text-white font-medium flex justify-between items-center gap-2'>
                                <FaCircleArrowRight fill='#FDC900' size={24} />
                                Go to shop
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='order-1 xl:order-2 flex justify-center'>
                <motion.div className='w-1/2 xl:w-auto ' initial={{ rotate: 25 }} animate={{ rotate: 0 }} transition={{ duration: 1 }}>
                    <img src={heroImage} />
                </motion.div>
                <div className='flex flex-col gap-4 xl:gap-8 h-fit mt-10 md:mt-20 xl:mt-28'>
                    <FlavorsContainer color='green' alt='banana' text='banana flavour' image={bananaImage} />
                    <FlavorsContainer color='blue' alt='vanilla' text='vanilla flavour' image={vanillaImage} />
                    <FlavorsContainer color='yellow' alt='milk' text='milk flavour' image={milkImage} />
                </div>
            </div> */}

              {/* Carousel Container */}
            <div className="w-full h-full flex items-center justify-center px-8 overflow-hidden">
                {slides.map((slide, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={index === currentSlide ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute w-full flex flex-col xl:flex-row items-center gap-4 lg:max-w-screen-xl 2xl:max-w-screen-2xl ${
                    index === currentSlide ? "block" : "hidden"
                    }`}
                >
                    {/* Left Content */}
                    <div className="flex flex-col items-start space-y-3 xl:w-1/2 px-8">
                    <h1 className="font-varela text-2xl md:text-3xl xl:text-5xl font-extrabold tracking-wide">
                        {slide.title1}
                    </h1>
                    <h1 className="font-varela text-2xl md:text-3xl xl:text-5xl font-bold tracking-wide">
                        {slide.title2}
                    </h1>
                    <p className="text-just-gray text-lg md:text-xl max-w-sm">{slide.description}</p>
                    <img src={point} className='w-10 h-10' />
                    <Link to="/shop">
                        <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                            transition: { type: "spring", stiffness: 300, damping: 15, duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black py-2 md:py-3 px-4 md:px-6 rounded-xl tracking-wide text-lg text-white font-medium flex justify-between items-center gap-2"
                        >
                        <FaCircleArrowRight fill="#FDC900" size={24} />
                        Go to shop
                        </motion.button>
                    </Link>
                    </div>

                    {/* Right Image */}
                    <motion.div
                    initial={{ scale: 0.7,opacity: 0}}
                    whileInView={{ opacity: 1, scale: 1, x: index === 1 ? 90 : 0}}
                    transition={{ duration: 0.8, ease: 'linear' }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="w-1/2 xl:w-auto"
                    >
                        <img src={slide.image} alt="Hero" className={`rounded-lg ${index === 1 ? 'w-[270px] -rotate-12 ml-9' : 'xl:max-w-md'} `} />
                    </motion.div>
                </motion.div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {/* <button onClick={prevSlide} className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-85">
                <FaCircleArrowLeft size={18} />
            </button>
            <button onClick={nextSlide} className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 opacity-85 rounded-full">
                <FaCircleArrowRight size={18} />
            </button> */}

          

            
        </section>

     
    );
}
export default Hero;
