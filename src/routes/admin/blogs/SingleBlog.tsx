import { Dispatch, SetStateAction } from 'react'
import { ViewType } from './Blogs'
import { FaArrowLeftLong } from "react-icons/fa6";
import { SiOpenbadges } from "react-icons/si";
import {motion} from 'framer-motion';
import { sanitizeDescription } from '@/utils/sanitize';
import Loader from '@/components/Loader';
import { useGetSingleBlogQuery } from '@/features/blogs/blogsApiSlice';

type SingleBlogProps = {
    action: Dispatch<SetStateAction<ViewType>>
    ID: string
}
const SingleBlog = ({action, ID} : SingleBlogProps) => {
    const {data, isLoading} = useGetSingleBlogQuery({id:ID})
    console.log(action, ID)

    if(isLoading){
       return <Loader />
    }
    
  return (
    <div className='h-screen w-3/4 mx-auto overflow-y-scroll'>
    <motion.h1 
    whileHover={{
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300, damping: 15, duration: 0.3 }
    }}
    whileTap={{ scale: 0.95 }}
    onClick={() => action(ViewType.ALL_BLOGS)} 
    className="text-xl w-max flex items-center gap-5 my-6 cursor-pointer"> 
    <FaArrowLeftLong className='text-black text-lg' />
        Back to all Job posts
    </motion.h1>
    {data && (
        <div key={data._id} className='w-full flex flex-col gap-6'>
            {/* BLOG TITLE */}
            <h1 className='text-5xl text-left font-bold text-black/80'>{data.title}</h1>
            {/* BLOG  MAINIMAGE */}
            <div className=' w-full h-[433px] rounded-2xl'>
                <img src={data?.mainImage}  className='w-full h-full object-cover rounded-2xl' />
            </div>

            {/* JOB TITLE AND PAY AREA */}
            <div className='w-full flex items-start justify-between'>  
                <div className='flex flex-col gap-1'>
                    <div className='flex items-start gap-4'>
                        <SiOpenbadges className='text-[#DB4444] text-5xl' /> 
                        <div className="flex flex-col gap-2">
                            <p className='text-base text-black/90 font-semibold'>{data.author}</p>
                            <p className='text-sm text-black/80'>{new Date(data.createdAt).toLocaleDateString()}</p>
                            <div className='w-full flex items-center gap-2 flex-wrap'>
                            {data.tags.map(tag => ( 
                                <p className="p-1 bg-black/40 text-white w-max text-xs rounded-md px-3">{tag}</p>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className='h-[2px] bg-black/40' />

            {/* BLOG CONTENT */}
            <div className='w-full'>
                <div className="text-sm text-black/90 w-full job-description" dangerouslySetInnerHTML={{__html: sanitizeDescription(data.content)}}/>
            </div>
        </div>
    )}
  </div>
  )
}

export default SingleBlog