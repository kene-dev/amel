import { HeroContainer } from '../components';
import image from '../assets/svgs/dark-map.svg';
import bannerImage from '../assets/svgs/distributors.svg';
import jendol from '../assets/svgs/jendol.svg';
import jf from '../assets/svgs/jf.svg';
import freddy from '../assets/svgs/freddy.svg';
import kk from '../assets/svgs/kk.svg';
import ms from '../assets/svgs/ms.svg';
import ss from '../assets/svgs/ss.svg';
import bokku from '../assets/svgs/bokku.svg';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import { bakingDealers, breakfastDealers, corporateClients, supermarkets } from '@/utils/storeLocationData';
import Modal from '@/components/Modal';

function DistributorsPage() {
    const section = useRef(null);
    const [openModal, setOpenModal] = useState(false)
    const sectionInView = useInView(section, { once: true });
    const [activeTab, setActiveTab] = useState('breakfast');
    const [displayDealers, setDisplayDealers] = useState(bakingDealers)

    const handleTabChange = (item: string) => {
    if(item === 'breakfast'){
      setDisplayDealers(breakfastDealers)
      setActiveTab(item)
    }else{
      setDisplayDealers(bakingDealers)
      setActiveTab(item)
    }
  } 

  const images = [
    jendol, jf, freddy, kk, ms, ss, bokku
  ]
  



    return (
        <>
            <div className='bg-milk h-48'></div>
            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
                className='-mt-44 flex items-center justify-center'>
                <HeroContainer
                    theme='black'
                    title='Our Networks'
                    subHeading='Bringing Quality to Your Doorstep'
                    content='From bustling urban centers to serene rural areas, our goal is to make our nutritious cereals and baking ingredients accessible to every Nigerian household.'
                    buttonLabel={<p className='font-semibold'>Become a Distributor</p>}
                    action={setOpenModal}
                    imageSrc={bannerImage}
                />
            </motion.div>

            <div className='bg-white py-16 mx-auto'>
                <div>
                    <motion.div
                        ref={section}
                        initial={{ y: 200, opacity: 0.5 }}
                        animate={sectionInView ? { y: 0, opacity: 1 } : {}}
                        exit={{ y: -200, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
                        className='flex justify-center items-center mt-4 mx-2 md:mx-4 xl:mx-0'>
                        <img src={image} />
                    </motion.div>

                    <div className='text-center mx-auto py-8  max-w-[90%] xl:max-w-[40%]'>
                        <h1 className='font-semibold text-2xl md:text-3xl'>Nationwide Reach</h1>
                        <p className=' text-sm md:text-lg text-gray-700'>
                            Our extensive distribution channels cover all regions of Nigeria, ensuring timely delivery and product availability wherever you are.
                        </p>
                    </div>
                </div>

                   <div className='w-full my-5 '>
                    <Carousel opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                        delay: 4000,
                        }),
                    ]} className='lg:w-[95%] mb-10 mx-auto'>
                        <CarouselContent>
                            {images?.map((image, index) => (
                                <CarouselItem key={index} className='basis-2/3 md:basis-1/3 lg:basis-1/4 2xl:basis-2/6 '>
                                    <div className='lg:w-[200px] lg:h-[200px] w-[150px] h-[150px]'>
                                        <img className=' w-full h-full object-contain aspect-auto' src={image} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {/* <CarouselNext className='hidden lg:flex bg-primary text-white' />
                        <CarouselPrevious className='hidden lg:flex bg-primary/80 text-white' /> */}
                    </Carousel>
                </div>



                <div className='w-full h-max lg:h-[744px] lg:px-10 lg:py-10 '>
                    <div className='h-full w-full lg:px-10 py-10 lg:py-0 flex flex-col gap-10 justify-evenly bg-[#F4F4F4] rounded-2xl'>

                        {/* CORPORATE CLIENT SECTION */}
                        <div className='text-center flex flex-col gap-7'>
                            <h1 className='text-[#E31E24] font-semibold text-[27px]'>Corporate Clients</h1>
                            <div className='w-full flex items-center justify-center gap-5 flex-wrap'>
                                {corporateClients.map((client, idx) => (
                                <div className='bg-[#E31E241C] p-2 px-6 rounded-[10px] text-center text-sm w-max font-normal' key={idx}>
                                    <p>{client.title}</p>
                                    <span className='text-xs text-[#12121266]'>{client.slug}</span>
                                </div>  
                                ))}
                            </div>
                        </div>

                        <hr className='h-[2px] bg-black/30' />

                         {/* CORPORATE CLIENT SECTION */}
                        <div className='text-center flex flex-col gap-7'>
                            <h1 className='text-[#E31E24] font-semibold text-[27px]' >Supermarkets</h1>
                            <div className='w-full flex items-center justify-center gap-5 flex-wrap'>
                                {supermarkets.map((store, idx) => (
                                <div className='bg-[#E31E241C] p-2 px-6 rounded-[10px] text-center text-sm w-max font-normal' key={idx}>
                                    <p>{store}</p>
                                </div>  
                                ))}
                            </div>
                        </div>


                    </div>
                </div>

                <div className='w-full h-max flex lg:flex-row items-center flex-col lg:px-10 py-10 px-5 '>
                    <p onClick={() => handleTabChange('baking')} className={`w-full p-4 border-b-2 ${activeTab === 'baking' ? 'border-[#E31E24] text-black' : 'border-[#1D1D1D33]  text-black/30'} text-center text-xl duration-300 ease-linear`}>Baking Dealers</p>
                    <p onClick={() => handleTabChange('breakfast')} className={`w-full p-4 border-b-2 ${activeTab === 'breakfast' ? 'border-[#E31E24] text-black' : 'border-[#1D1D1D33]  text-black/30'} text-center text-xl duration-300 ease-linear`}>Breakfast Dealers</p>
                </div>

                <div className='w-full flex flex-wrap items-center gap-7 px-5 lg:max-w-screen-xl xl:max-w-screen-2xl mx-auto'>
                {displayDealers.map((items, index) => (
                    <Accordion key={index} type="single" collapsible className='lg:w-[320px] w-full'>
                            <AccordionItem  value={items.state}>
                                <AccordionTrigger className='text-lg'>{items.state}</AccordionTrigger>
                                    <AccordionContent>
                                    <div className='flex flex-col gap-3 h-[150px] overflow-y-scroll'>
                                        <div className='flex flex-col gap-5'>
                                            {items.stores.map((store, i) => (
                                                <div key={i} className=''>
                                                    <div>
                                                        <h1 className='font-semibold'>Address</h1>
                                                        <p className='text-[#2B2A29]/70'>{store.address}</p>
                                                    </div>

                                                    <div className='flex items-center w-full text-[#2B2A29]/70 '>
                                                        <span className='text-just-red'>Store:</span>{store.name}
                                                    </div>
                                                </div>
                    
                                                ))}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                    </Accordion>
                        ))}
                </div>
            </div>

            {openModal && <Modal action={setOpenModal} />}
        </>
    );
}
export default DistributorsPage;
