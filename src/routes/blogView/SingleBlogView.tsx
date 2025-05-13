import { useGetSingleBlogQuery } from "@/features/blogs/blogsApiSlice"
import { useNavigate, useParams } from "react-router-dom"
import {motion} from 'framer-motion';
import { FaArrowLeftLong } from "react-icons/fa6";
import { SiOpenbadges } from "react-icons/si";
import { sanitizeDescription } from "@/utils/sanitize";
import Loader from "@/components/Loader";

const SingleBlogView = () => {
    const {id} = useParams()
    const {data, isLoading} = useGetSingleBlogQuery({id})
    const navigate = useNavigate()
  return (
    <div className='lg:w-[80%] mx-auto px-5 min-h-screen py-10'>
    {isLoading && <Loader />}
    <motion.h1 
    whileHover={{
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300, damping: 15, duration: 0.3 }
    }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigate('/blog-view')} 
    className="text-xl w-max flex items-center gap-5 mb-6 cursor-pointer underline"> 
        <FaArrowLeftLong className='text-black text-lg' />
        Back
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
                <div className='w-full flex flex-col gap-4 items-start'>  
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

export default SingleBlogView