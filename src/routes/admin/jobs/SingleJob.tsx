import { Dispatch, SetStateAction } from 'react';
import { IoMdBriefcase } from "react-icons/io";
import { ViewType } from './Jobs';
import { FaArrowLeftLong } from "react-icons/fa6";
import {motion} from 'framer-motion';
import { useGetSingleJobQuery } from '@/features/jobs/jobsApiSlice';
import { sanitizeDescription } from '@/utils/sanitize';
import Loader from '@/components/Loader';

type SingleJobProps = {
    action: Dispatch<SetStateAction<ViewType>>
    ID: string
}

const SingleJob:  React.FC<SingleJobProps> = ({action, ID}) => {
    const {data, isLoading} = useGetSingleJobQuery({id:ID})
    console.log("SINGLE JOB ",data)

    if(isLoading){
        return <Loader />
    }

return (
 <div className='h-screen overflow-y-scroll'>
    <motion.h1 
    whileHover={{
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300, damping: 15, duration: 0.3 }
    }}
    whileTap={{ scale: 0.95 }}
    onClick={() => action(ViewType.ALL_JOBS)} 
    className="text-xl w-max flex items-center gap-5 my-6 cursor-pointer"> 
        <FaArrowLeftLong className='text-black text-lg' />
        Back to all Job posts
    </motion.h1>
    {data && (
        <div key={data._id} className='w-[668px] flex flex-col gap-6'>
            {/* JOB IMAGE */}
            <div className=' w-full h-[233px] rounded-2xl'>
                <img src={data?.image}  className='w-full h-full object-cover rounded-2xl' />
            </div>

            {/* JOB TITLE AND PAY AREA */}
            <div className='w-full flex items-start justify-between'>
                {/* JOB TITLE */}
                <div className='flex flex-col gap-1'>
                    <h1 className='text-2xl'>{data.title}</h1>
                    <div className='flex items-center gap-4'>
                    <IoMdBriefcase className='text-[#DB4444] text-lg' /> 
                    <p className='text-sm text-black/80'>{data.jobType}, {data.workLocation}</p>
                    </div>
                </div>

                {/* JOB RENUMERATION */}
                <p className='text-sm text-black/80'>${data.priceRangeMin} - ${data.priceRangeMax}/mon</p>
            </div>

            {/* JOB DESCRIPTION */}
            <div className='w-full'>
                <h3 className='font-semibold'>Description</h3>
                <div className="text-sm text-black/90 w-[640px] job-description" dangerouslySetInnerHTML={{__html: sanitizeDescription(data.description)}}/>
            </div>
        </div>
    )}
  </div>
  )
}

export default SingleJob