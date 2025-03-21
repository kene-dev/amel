import { Link } from 'react-router-dom';
import map from '../../assets/svgs/map.svg';
import Button from '../Button';
import { useState } from 'react';
import Modal from '../Modal';


function Distributors() {
    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        <div className='bg-black flex xl:flex-row flex-col p-8 gap-4 md:gap-6 xl:gap-0'>
            <div className='order-2 xl:order-1 md:basis-1/2 self-center md:px-24 text-center xl:text-start text-white'>
                <h1 className='font-semibold text-2xl md:text-4xl mb-1 md:mb-4'>Our Distributors</h1>
                <p className='max-w-md md:text-lg text-gray-200 mb-4'>
                    At Amel Susan, We pride ourselves on an efficient and reliable distribution network that ensures our products are available globally.
                </p>
                 <Link to='distributors'>
                    <Button theme='red' text='Find a dealer near you' />
                 </Link>
                <div className='flex flex-col text-center lg:w-[219px] w-full mt-2'>
                    <p className='text-xs'>Or</p>
                    <h1 onClick={() => setOpenModal(!openModal)} className='underline text-lg cursor-pointer'>Become a Dealer</h1>
                </div>
            </div>
            <div className='order-1 xl:order-2 flex justify-center'>
                <img src={map} />
            </div>

            {openModal && <Modal action={setOpenModal} />}
        </div>
    );
}
export default Distributors;
