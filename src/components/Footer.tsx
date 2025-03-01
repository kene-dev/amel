import FooterLink from './FooterLink';
import Logo from './Logo';
import { links } from '../utils/footerLinks';
import { RiFacebookFill, RiInstagramLine, RiLinkedinBoxFill, RiTwitterXLine } from 'react-icons/ri';
import { FaTiktok } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='p-8 bg-milk divide-y-[1.5px] space-y-6 md:space-y-4 divide-[#1212124D]'>
            <section className='py-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 space-y-4 '>
                <div>
                    <Link to='/'>
                        <Logo />
                    </Link>
                    <p className='max-w-sm mt-2 text-just-gray tracking-wide'>We are Nigeria’s top manufacturer of Baking ingredients and Breakfast cereals</p>
                    <div className='mt-2'>
                        <h2 className='text-black font-bold text-lg'>Email</h2>
                        <div className='flex flex-col gap-2'>

                            <div className='flex flex-col items-start  text-sm text-just-red font-semibold'>
                                General Inquiries : 
                                <a className='hover:underline tracking-wide text-base text-black' href='mailto:info@amelsusanproducts.com'>
                                    info@amelsusanproducts.com
                                </a>
                            </div>
                            <div className='flex flex-col items-start  text-sm text-just-red font-semibold'>
                                Sales Related Inquiries : 
                                <a className='hover:underline tracking-wide text-base text-black' href='mailto:sales@amelsusanproducts.com'>
                                sales@amelsusanproducts.com
                            </a>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                <div className='grid grid-cols-2 md:px-3'>
                    {links.map((link: { path: string; name: string }) => {
                        return <FooterLink key={link.name} path={link.path} name={link.name} />;
                    })}
                </div>
                <div className='flex flex-col Xl:items-center'>
                    <div>
                        <h2 className='text-just-red font-bold text-lg'>Contact Us</h2>
                        <p className='text-just-gray max-w-xs'>13, Dabiri Street, off NNPC road, Ejigbo 100264, Lagos, Nigeria.</p>
                    </div>
                </div>
            </section>
            <section className='flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between pt-4'>
                <p className='order-2 md:order-1 text-just-gray text-sm md:text-base'>Copyright 2024 Amel International Services Limited. All rights reserved.</p>
                <div className='flex items-center  gap-2 order-1 md:order-2'>
                    <Link to=''>
                        <RiFacebookFill fill='#2B2A29B2' size={20} />
                    </Link>
                    <Link to=''>
                        <FaTiktok fill='#2B2A29B2' size={20} />
                    </Link>
                    <Link to=''>
                        <RiLinkedinBoxFill fill='#2B2A29B2' size={20} />
                    </Link>
                    <Link to=''>
                        <RiTwitterXLine fill='#2B2A29B2' size={20} />
                    </Link>
                    <Link to=''>
                        <RiInstagramLine fill='#2B2A29B2' size={20} />
                    </Link>
                </div>
            </section>
        </footer>
    );
}
export default Footer;
