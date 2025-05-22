import { FaCircleArrowRight } from 'react-icons/fa6';
import { FaLinkedin } from "react-icons/fa";
import { DownloadIcon, HeroContainer } from '../components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { teamData } from '@/utils/storeLocationData';
import aboutBanner from '../assets/svgs/aboutBanner.svg';
import brochure from '../../brochure.pdf'


function AboutPage() {
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
                    theme='red'
                    title='About us'
                    subHeading='Amel International Services Limited'
                    content='We are Nigeria’s foremost baking ingredients and breakfast cereals brand  AMEL SUSAN, offering you quality products always… AMEL International Services Ltd, RC 1190152 is a wholly indigenous company dedicated to the sustainable production and packaging of high-quality foods and beverages.  '
                    buttonLabel={
                        <p className='flex items-center gap-2 font-semibold '>
                            <DownloadIcon /> Download our brochure
                        </p>
                    }
                    download={brochure}
                    imageSrc={aboutBanner}

                />
            </motion.div>

            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
                className='bg-white grid grid-cols-1 h-full xl:grid-cols-2 place-items-center pb-16 xl:pb-0 md:mb-12 px-4 md:p-8'>
                <div className='bg-[#F4F4F4] flex flex-col gap-3 md:gap-6  w-[100%] max-w-xl mt-6 md:mt-4 drop-shadow-md rounded-3xl p-8'>
                    <h1 className='font-semibold text-2xl md:text-3xl text-center mb-4'>Mission & Vision</h1>
                    <div className='grid md:grid-cols-2 gap-2 md:gap-0'>
                        <span className='flex items-center gap-2 self-start'>
                            <FaCircleArrowRight fill='#E31E24' size={20} />
                            <h4 className='font-semibold md:text-lg'>Mission</h4>
                        </span>
                        <p className='text-just-gray font-medium text-sm md:text-base'>Bringing Quality Products to every Household.</p>
                    </div>
                    <div className='grid md:grid-cols-2 gap-2 md:gap-0'>
                        <span className='flex items-center gap-2 self-start '>
                            <FaCircleArrowRight fill='#E31E24' size={20} />
                            <h4 className='font-semibold md:text-lg'>Vision</h4>
                        </span>
                        <p className='text-just-gray font-medium text-sm md:text-base max-w-md '>
                            To be a major player in the Food and Beverage industry, contributing our quota to growth and development of “Made in Nigeria” Campaign from Nigeria to
                            the world.
                        </p>
                    </div>
                    <div className='grid md:grid-cols-2 gap-2 md:gap-0'>
                        <span className='flex items-center gap-2 self-start'>
                            <FaCircleArrowRight fill='#E31E24' size={20} />
                            <h4 className='font-semibold md:text-lg'>Philosophy</h4>
                        </span>
                        <p className='text-just-gray font-medium text-sm md:text-base max-w-md'>
                            Over more than 10 years, we’ve foste red trusted relationships across government, industry and global forums. We adapt our delivery to the way your
                            work, whether as an exter To provide consultancy for preparing of all sorts of corporate.
                        </p>
                    </div>
                </div>
                {/* ROADMAP */}
                <div className='mt-16 w-[85%] md:w-[60%] xl:w-[70%] h-full'>
                    <h1 className='font-semibold text-2xl md:text-3xl mb-4'>Our Roadmap</h1>
                    {/* TODO: when animating increase the border height in "20s" or "5rem" i.e from h-40 to h-60,etc */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='relative border-l-2  h-[25rem] border-primary'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                            className='absolute  flex flex-col gap-8 z-[1] mt-12 -ml-4'>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className='flex items-center gap-6'>
                                <div className='p-2 size-8 bg-primary rounded-full'></div>
                                <div className='max-w-md'>
                                    <p className='font-semibold md:text-lg'>14th May, 2014</p>
                                    <p className='text-gray-500 font-medium text-sm md:text-base'>Establishment of Amel International Services</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className='flex items-center gap-6'>
                                <div className='p-2 size-8 bg-primary rounded-full'></div>
                                <div className='max-w-md'>
                                    <p className='font-semibold md:text-lg'>2015</p>
                                    <p className='text-gray-500 font-medium text-sm md:text-base'>Opened our distribution in Abuja</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className='flex items-center gap-6'>
                                <div className='p-4 md:p-2 size-8 bg-primary rounded-full'></div>
                                <div className='max-w-md'>
                                    <p className='font-semibold md:text-lg'>2019 - 2020</p>
                                    <p className='text-gray-500 font-medium text-sm md:text-base'>AISL Buidling was developed in 2019 and completed in 2020</p>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                                className='flex items-center gap-6'>
                                <div className='p-4 md:p-2 size-8 bg-primary rounded-full'></div>
                                <div className='max-w-md'>
                                    <p className='font-semibold md:text-lg'>2nd Oct, 2021</p>
                                    <p className='text-gray-500 font-medium text-sm md:text-base'>
                                        Listed as a member of MAN (Manufacturer's Association of Nigeria) and LCCI in 2020
                                    </p>
                                </div>
                            </motion.div>
                           
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* TEAMS SECTION */}
            <div className='w-full lg:px-20 px-5 mt-36'>
                    <div className='w-full flex items-center gap-16'>
                        <h1 className='font-semibold text-2xl'>Our team</h1>
                        <p className='text-[#121212]/80'>Our extensive distribution channels cover all regions of <br />
                        Nigeria, ensuring timely delivery and product availability wherever you are.</p>
                    </div>

                    <hr className='my-10 h-[2px] bg-[#121212]/30'/>

                    <div className='w-full lg:flex items-start my-10  '>
                        <div className='hidden lg:flex w-[300px]'></div>
                        <div className='flex-1 flex flex-wrap items-start gap-6'>
                            {teamData.map((item, index) => (
                                <div  key={index} className=' w-full lg:w-[287px] h-[420px] rounded-3xl'>
                                    <img src={item.image} className='w-full h-[330px] rounded-2xl object-cover aspect-auto'/>
                                    <h1 className='text-xl font-semibold mt-2 flex-1'>{item.name}</h1>
                                    <p className='text-xs text-[#121212]/70 pr-4'>{item.title}</p>
                                    <Link to={item.linkedIn} target='blank'>
                                        <FaLinkedin className='w-6 h-6 text-blue-500 mt-1 rounded-lg' />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </>
    );
}
export default AboutPage;
