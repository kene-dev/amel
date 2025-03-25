import { HeroContainer } from '../components';
import image from '../assets/svgs/dark-map.svg';
import bannerImage from '../assets/svgs/distributors.svg';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { storeLocationData } from '@/utils/storeLocationData';
import Modal from '@/components/Modal';

function DistributorsPage() {
    const section = useRef(null);
    const [openModal, setOpenModal] = useState(false)
    const sectionInView = useInView(section, { once: true });
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
                    title='distributors'
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

                <div className='w-full flex flex-wrap items-center gap-7 px-5 lg:max-w-screen-xl xl:max-w-screen-2xl mx-auto'>
                {storeLocationData.map((items, index) => (
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
                                                        <span className='text-just-red'>Contact:</span>{store.contact}
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
