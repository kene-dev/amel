import bgImage from '../../assets/webp/home_about_us_bg.webp';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/png/amel2.png';
import ig from '../../assets/svgs/ig-icon.svg';


interface Slide {
    text: string;
    icon: string;
    handle:string
   
  }
  
  const slides: Slide[] = [
    {
      text: "Your 3 in 1 custard is very nice. As a baker, I use your product especially the icing sugar.",
      icon: ig,
      handle:"@Damiofdl18events"
    },
    {
        text: "My beautiful 3 in 1 Custard powder moving so fast in my area here in Ogijo",
        icon: ig,
        handle:"@Emmybee Beauty Olaniyan" 
    },
    {
        text: "Amel Susan has nutritious quality products always.",
        icon: ig,
        handle:"@Mutiat Temilade Azeez "
    },
  ];

function About() {
    const section1 = useRef(null);
    const sectionInview = useInView(section1, { once: true });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
        
    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // const prevSlide = () => {
    //     setDirection(-1);
    //     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    // };

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    const slideVariants = {
        hidden: (direction: number) => ({
            y: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: (direction: number) => ({
            y: direction > 0 ? -50 : 50,
            opacity: 0,
            transition: { duration: 0.5 }
        })
    };

    return (
        <section className='lg:px-8'>
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


             <div className='py-16 md:py-20 lg:px-8 px-3 w-full' style={{ background: `url(${bgImage}) no-repeat`, backgroundSize: 'cover' }}>
                <motion.div
                    ref={section1}
                    initial={{ y: -50, opacity: 0 }}
                    animate={sectionInview ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className='flex justify-center'>

                    <div className='flex flex-col justify-center items-center bg-black/70 border-2 border-[#FECC00]/80 lg:p-8 h-40 md:h-48 w-full md:w-1/2 rounded-2xl relative'>
                        <div className='w-full h-full flex items-center justify-center px-8 overflow-hidden'>
                            <AnimatePresence mode='wait' custom={direction}>
                                {slides.map((slide, index) => (
                                    currentSlide === index && (
                                        <motion.div
                                            key={index}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className='absolute w-full flex flex-col items-center justify-center gap-4 lg:max-w-screen-xl 2xl:max-w-screen-2xl'
                                        >
                                            <p className='max-w-lg text-center line-clamp-3 text-gray-200 font-medium md:text-lg'>
                                                {slide.text}
                                            </p>
                                            <p className='capitalize font-light text-sm md:text-base text-gray-400 flex items-center gap-2'>
                                                <img src={slide.icon} alt="social icon" />
                                               <span>- {slide.handle}</span> 
                                            </p>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                            <img className='md:size-auto w-[105px] md:w-[150px] absolute -right-7 -bottom-5 p-2 rounded-2xl' src={logo} alt="logo" />
                        </div>

                        {/* Navigation Dots */}
                        <div className='absolute lg:bottom-4 -bottom-5 flex gap-2'>
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full ${
                                        currentSlide === index ? 'bg-[#FECC00]' : 'bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
export default About;
