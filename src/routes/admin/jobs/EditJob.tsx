import { Button } from "@/components"
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
import { editJobSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import uploadIcon from '../../../assets/svgs/uploadIcon.svg';
import currency from '../../../assets/svgs/currency.svg';
import { MdCancel } from 'react-icons/md';
import { z } from "zod";
import { Jobs } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import { RichTextEditor } from "@/components/RichTextEditor";
import { useEditJobMutation } from "@/features/jobs/jobsApiSlice";
import Loader from "@/components/Loader";
import { apiSlice } from "@/features/apiSlice";
import { useDispatch } from "react-redux";


type EditJobProps = {
    action: Dispatch<SetStateAction<boolean | undefined>>,
    currentJob?: Jobs
}
type JobFormData = {
    description: string | undefined
}
type editJobTypeInput = z.infer<typeof editJobSchema>;


const EditJob:React.FC<EditJobProps> = ({action, currentJob}) => {
    const [editJob, {isLoading}] = useEditJobMutation()
    const [selectedImage, setSelectedImage] = useState<any>(currentJob?.image);
    const [formData, setFormData] = useState<JobFormData>({
      description: currentJob?.description,
    })
    const dispatch = useDispatch()

     const {register, handleSubmit, setValue, formState:{errors} } = useForm<editJobTypeInput>({
        resolver: zodResolver(editJobSchema),
        defaultValues: {
          title: currentJob?.title,
          jobType: currentJob?.jobType as 'contract',
          workLocation: currentJob?.workLocation as 'onsite',
          image: currentJob?.image,
          priceRangeMin: currentJob?.priceRangeMin,
          priceRangeMax: currentJob?.priceRangeMax
        }
     })

     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = URL.createObjectURL(files[0]);
            setValue("image", files[0] || undefined)
            setSelectedImage(file)
        } else {
            console.log('No file selected');
        }
     }
    
    const handleRemoveImage = () => {
        if (selectedImage) {
            URL.revokeObjectURL(selectedImage);
            setSelectedImage(null);
        }
    };

    const formSubmit: SubmitHandler<editJobTypeInput> = async (data) => {
        if(data.image instanceof File){
           console.log("it a file")
        const newImage = await cloudinaryUpload(data.image)
        const newData = {...data, description: formData.description, image:newImage}
        try {
            const response = await editJob({data:newData, id:currentJob?._id}).unwrap();
            if(response){
              dispatch(apiSlice.util.invalidateTags(["Jobs"]))
              action(false)
              console.log("EDIT JOB RESET FORM STATE ")
            }
        } catch (error) {
          console.log("EDIT JOB ERROR", error)
        }
        }else{
           console.log("EDIT DATA SENT OUT",{...data, description: formData.description})
        const newData = {...data, description: formData.description}
        try {
            const response = await editJob({data:newData, id:currentJob?._id}).unwrap();
            if(response){
                dispatch(apiSlice.util.invalidateTags(["Jobs"]))
                action(false)
              console.log("RESET FORM STATE ")
            }
        } catch (error) {
          console.log("ERROR FOR CREATE JOB ", error)
        }
       }
    }
      
  return (
    <form onSubmit={handleSubmit(formSubmit)} className='w-[464px] h-[97%] overflow-y-scroll flex flex-col gap-10 bg-white rounded-md p-4'>
    {isLoading && <Loader />}

    {/* TOP LAYER OF JOB CARD */}
    <div className='w-full flex items-start justify-between'>
      <div>
        <h1 className='text-xl font-semibold'>Post a Job Now</h1>
        <p className='text-xs text-[#111111]/40'>Let’s start with a strong title</p>
      </div>
      <div onClick={() => action(false)}>
        <Button  theme='red' textStyle='text-xs p-1 cursor-pointer' text="cancel" />
      </div>
    </div>

    {/* IMAGE UPLOAD AREA */}
    <div className='w-full flex items-center justify-between'> 
      <div className='flex flex-col gap-2'>
        <h2>Cover Image</h2>
        <p className='text-xs'>Upload picture of your Job post <span className='text-[#DB4444]'>(5mb max)</span></p>
      </div>

      <label htmlFor='image-upload' className='w-auto h-[36px] bg-transparent border-[1px] border-[#111111]/30 flex items-center justify-center gap-5 text-xs text-[#111111]/60 px-3 p-2'>
          <img src={uploadIcon} className='w-5 h-5' />
          <input {...register('image')} type='file' id="image-upload" onChange={handleFileChange} className='hidden' />
          Upload Picture
      </label>
    </div>
      {errors.image && (<p className="mt-1 text-red-500 text-sm">{errors.image.message}</p>)}
    <>
      <AnimatePresence mode='sync'>
          {selectedImage && (
            <motion.div
            layout
            initial={{x:-100, opacity:0}}
            whileInView={{x:0, opacity:1}}
            viewport={{once: true}}
            exit={{x:-100, opacity:0,}} 
            transition={{duration:.3, ease:"linear"}}
            className='relative w-full'>
              <img src={selectedImage} className='h-[100px] w-full object-cover' />
              <MdCancel onClick={handleRemoveImage} className='absolute -top-3 -right-4 w-6 h-6 text-red-600 cursor-pointer' />
            </motion.div>
            )}
        </AnimatePresence>
       </>

        <div className='w-full flex flex-col gap-4'>
            <label className='text-sm'>What's the job title</label>
            <input {...register('title')} placeholder='Title' className='appearance-none w-full h-[46px] rounded-xl border-[1px] border-black/30 p-3 px-8 placeholder:text-black/70' />
            {errors.title && (<p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>)}
        </div>

        <div className='w-full flex flex-col gap-4'>
            <label className='text-sm'>Job Type</label>
            <select {...register('jobType')} className='appearance-none w-full h-[46px] text-black/70 rounded-xl border-[1px] border-black/30 p-3 px-8'>
                <option value='' selected disabled className='text-black/40'> Select Job Type</option>
                <option value='full-time'> Full-time</option>
                <option value='part-time'> Part-time</option>
                <option value='contract'> Contract</option>
            </select>
            {errors.jobType && (<p className="mt-1 text-red-500 text-sm">{errors.jobType.message}</p>)}
        </div>

        <div className='w-full flex flex-col gap-4'>
            <label  className='text-sm'>Work Location</label>
            <select {...register('workLocation')} className='appearance-none w-full h-[46px] rounded-xl border-[1px] text-black/70 border-black/30 p-3 px-8'>
                <option value='' selected disabled className='text-black/20'> Select Work Location</option>
                <option value='remote'> Remote</option>
                <option value='onsite'> On-site</option>
                <option value='hybrid'> Hybrid</option>
            </select>
            {errors.workLocation && (<p className="mt-1 text-red-500 text-sm">{errors.workLocation.message}</p>)}
        </div>

        <div className='w-full flex flex-col gap-4'>
            <h1>Description</h1>
            <RichTextEditor
            content={formData.description}
            onChange={(description) => setFormData({...formData, description})}
            placeholder='Type here'
            />
        </div>

        <div className='w-full flex flex-col gap-1'>
            <h1>Pay Range</h1>

            <div className='w-full flex items-center justify-between gap-3'>
                <div className=' h-[50px] flex flex-col items-start relative border-[2px] border-black/60 rounded-md'>
                    <input {...register('priceRangeMin')} type='number' placeholder='min:100,000' className=' [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-4/5 focus:outline-none text-sm h-full p-2 placeholder:text-black/40' />
                    <div className='w-2/6 h-[35px] mx-1 flex items-center justify-center text-white text-xs gap-1 bg-black rounded-md absolute top-1.5 right-0'>
                        <img src={currency} className='w-1/3 h-1/3 object-cover' />
                        NGN
                    </div>
                    {errors.priceRangeMin && (<p className="mt-1 text-red-500 text-sm">{errors.priceRangeMin.message}</p>)}
                </div>

                <div className='h-[50px] flex flex-col items-start relative border-[2px] border-black/60 rounded-md'>
                    <input {...register('priceRangeMax')} type='number' placeholder='max:500,000' className=' [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-3/4 focus:outline-none text-sm h-full p-2 placeholder:text-black/40' />
                    <div className='w-2/6 h-[35px] mx-1 flex items-center justify-center text-white text-xs gap-1 bg-black rounded-md absolute top-1.5 right-0'>
                        <img src={currency} className='w-1/3 h-1/3 object-cover' />
                        NGN
                    </div>
                    {errors.priceRangeMax && (<p className="mt-1 text-red-500 text-sm">{errors.priceRangeMax.message}</p>)}
                </div>
            </div>

        </div>

        <div className='w-full'>
         <Button width='100%' type='submit' theme='red' textStyle='text-base p-1 cursor-pointer' text="Post Job" />
        </div>

    </form>
  )
}

export default EditJob