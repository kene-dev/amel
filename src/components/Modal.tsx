import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from './Button';

type ModalProps = {
  action : (arg: boolean) => void
}

function Modal({action}:ModalProps) {
  return (
    <div onClick={() => action(false)} className='w-full fixed inset-0 bg-black/70 flex items-center justify-center'>
        <div  onClick={(e) => e.stopPropagation()}  className='w-2/5 h-[80%] bg-white rounded-md p-6 px-16 flex flex-col gap-5 items-center justify-center relative z-10'>
            <div className='flex flex-col gap-1 text-center text-2xl'>
              <h1 className='text-black font-semibold'>Become a Distributor </h1>
              <p className='text-sm text-subtle/70'>Become a distribbutor and get your own product line.</p>
            </div>

            <div className='w-full flex flex-col gap-1'>
              <label className='text-subtle/70 text-sm'>Company name</label>
              <input className='appearance-none w-full p-3 border-[1px] rounded-lg border-subtle/35 ' />
            </div>

            <div className='w-full relative flex flex-col gap-1'>
              <label className='text-subtle/70 text-sm'>What product would you like to distribute</label>
              <select className="w-full p-3 pr-10 border text-sm border-gray-300 rounded-lg appearance-none 
               focus:outline-none focus:border-blue-50 focus:ring-2 text-gray-400 focus:ring-blue-100
               transition-all duration-200 bg-white hover:border-gray-400"
                defaultValue=""
                aria-label="Select an option"
                >
                <option value="" disabled hidden>Select an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
              <div className="pointer-events-none absolute top-9 right-0 h-max flex items-center justify-center px-3">
                <MdKeyboardArrowDown className="w-7 h-7 text-gray-400" />
              </div>
            </div>

            <div className='w-full flex items-start gap-5'>
              <div className='w-full flex flex-col gap-1'>
                <label className='text-subtle/70 text-sm'>Contact Number</label>
                <input className='appearance-none w-full p-3 border-[1px] rounded-lg border-subtle/35 ' />
              </div>

              <div className='w-full flex flex-col gap-1'>
                <label className='text-subtle/70 text-sm'>Email</label>
                <input className='appearance-none w-full p-3 border-[1px] rounded-lg border-subtle/35 ' />
              </div>
            </div>  
            <div className='w-full flex items-start gap-5'>
              <div className='w-full flex flex-col gap-1'>
                <label className='text-subtle/70 text-sm'>City</label>
                <input className='appearance-none w-full p-3 border-[1px] rounded-lg border-subtle/35 ' />
              </div>

              <div className='w-full flex flex-col gap-1'>
                <label className='text-subtle/70 text-sm'>State</label>
                <input className='appearance-none w-full p-3 border-[1px] rounded-lg border-subtle/35 ' />
              </div>
            </div>  

            <Button text='Enlist' type='button' theme='red' width='100%' />
        </div>
    </div>
  )
}

export default Modal