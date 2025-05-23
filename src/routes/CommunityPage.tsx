import { HeroContainer } from '../components';
import image from '../assets/svgs/shop_hero_image.svg';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import Lottie from "lottie-react";
import success from '../assets/success.json';

const inputStyle = {
    small: ' w-full xl:max-w-sm p-3 rounded bg-gray-100 focus:ring-1 ring-primary outline-none',
    wide: 'w-full p-3 rounded bg-gray-100 focus:ring-1 ring-primary outline-none'
};

function CommunityPage() {
      const [state, handleSubmit] = useForm("xvganbgk");
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
                    title='Contact us'
                    subHeading='Our Head Office Address'
                    content={
                        <div>
                            <p className='font-medium text-base'>11/13, Dabiri Street, off NNPC Road, Ejigbo</p>
                            <p className='font-medium text-base'>100264,</p>
                            <p className='font-medium text-base'>Lagos, Nigeria.</p>
                        </div>
                    }
                    imageSrc={image}
                />
            </motion.div>
            <motion.section
                initial={{ y: 200, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -200, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
                className='bg-white flex flex-col xl:flex-row justify-center gap-8 xl:gap-4 lg:p-8  p-5'>
                <div className='order-2 xl:order-1 flex flex-col mx-auto xl:mx-0 gap-4 bg-white max-w-lg drop-shadow-md rounded-2xl p-8 '>
                    <div className='flex items-center gap-3'>
                        <span className='bg-just-red p-2 rounded-full '>
                            <BsTelephone fill='white' size={24} />
                        </span>
                        <p className='font-medium text-lg'>For Inquiry</p>
                    </div>
                    <p>We are available 24/7, 7 days a week.</p>
                    <p>Phone: +234 817 351 8919</p>
                    <div className='border-b border-zinc-500 '></div>
                    <div className='flex items-center gap-3'>
                        <span className='bg-just-red p-2 rounded-full '>
                            <MdOutlineEmail fill='white' size={24} />
                        </span>
                        <p className='font-medium text-lg'>Write To US</p>
                    </div>
                    <p className='max-w-sm'>Fill out our form and we will contact you within 24 hours.</p>
                    <a className='hover:underline' href='mailto:info@amelsusanproducts.com'>
                        Email: info@amelsusanproducts.com
                    </a>
                    <a className='hover:underline' href='mailto:sales@amelsusanproducts.com'>
                        Email: sales@amelsusanproducts.com
                    </a>
                </div>
                <div className='order-1 xl:order-2 bg-white drop-shadow-md rounded-2xl p-4 md:p-8'>
                    {state.succeeded ? (
                        <div className='flex-col items-center justify-center gap-5'>
                            <h1 className='text-center text-xl font-semibold'>Thanks for Reaching out</h1>
                            <p className='text-center text-base'>Your message has been safely <br/> delivered to our inbox. We’ll get back to you within 24–48 hours.</p>
                            <Lottie animationData={success}  style={{height:300, width:"100%"}} />
                        </div>
                    ): (
                    <form action='https://formspree.io/f/xvganbgk' method='POST' onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <div className='flex flex-wrap xl:flex-nowrap items-center gap-4 xl:gap-2'>
                            <input className={inputStyle.small} placeholder='Your Name*' type='text' name='name' required />
                            <ValidationError 
                                prefix="Email" 
                                field="name"
                                errors={state.errors}
                            />
                            <input className={inputStyle.small} placeholder='Your Email*' type='email' name='email' required />
                            <input className={inputStyle.small} placeholder='Your Phone*' type='tel' name='phone' required />
                        </div>


                        <input className={`hidden xl:block ${inputStyle.wide}`} placeholder='Your Purpose' type='text' name='purpose' required />
                        <textarea className={`resize-none ${inputStyle.wide}`} rows={6} placeholder='Your Message' name='message' required />


                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                disabled={state.submitting}
                                className='rounded-md bg-just-red text-white font-medium hover:bg-red-600 py-2 px-3 text-sm md:text-base md:py-3 md:w-1/4 hover:drop-shadow-md'>
                                {state.submitting ? 'Sending Message' : "Send Message"}
                            </button>
                        </div>
                    </form>
                    )}


                </div>
            </motion.section>
        </>
    );
}
export default CommunityPage;
