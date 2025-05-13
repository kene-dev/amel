import { createBlogSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import upload from '@/assets/svgs/upload.svg'
import { z } from "zod";
import { TagsInput } from "@/components/TagsInput";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components";
import { ViewType } from "./Blogs";
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
import { useCreateBlogsMutation } from "@/features/blogs/blogsApiSlice";
import { MdCancel } from 'react-icons/md';
import Loader from "@/components/Loader";

type CreateBlogProps = {
    action: Dispatch<SetStateAction<ViewType>>
}

type createBlogTypeInput = z.infer<typeof createBlogSchema>;
type BlogFormData = {
    description: string
}
const CreateBlogs = ({action}: CreateBlogProps) => {
     const [fileName, setFileName] = useState<any>(null);
        const [formData, setFormData] = useState<BlogFormData>({
            description: 'Type here...',
        })
        const [createBlog] = useCreateBlogsMutation()
        const {register, control, handleSubmit, setValue, reset, formState:{errors, isSubmitting} } = useForm<createBlogTypeInput>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            title: '',
            mainImage: undefined,
            author:"",
            tags:[]
        }
        })
    
        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                const file = URL.createObjectURL(files[0]);
                setValue("mainImage", files[0])
                setFileName(file)
            } else {
                console.log('No file selected');
            }
        }

        const handleRemoveImage = () => {
            if (fileName) {
                URL.revokeObjectURL(fileName);
                setFileName(null);
            }
        };

        const formSubmit: SubmitHandler<createBlogTypeInput> = async (data) => {
          if(!formData.description) return
          console.log(data)
          const newImage = await cloudinaryUpload(data.mainImage)
          const newData = {...data, content: formData.description, mainImage:newImage}
          try {
              const response = await createBlog(newData).unwrap();
              if(response){
                reset()
                setFormData({description: "Type here..."})
                setFileName(null)
                console.log("RESET FORM STATE ")
              }
          } catch (error) {
            console.log("ERROR FOR CREATE JOB ", error)
          }
        }


  return (
    <div className="w-4/5 h-full flex flex-col gap-3"> 
            {isSubmitting && <Loader />}     
            <div className="place-self-end" onClick={() => action(ViewType.ALL_BLOGS)}>
                 <Button theme='red' textStyle='text-xs p-1 cursor-pointer' text="See all job posts" />
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className="w-full flex flex-col gap-7 bg-white rounded-md p-4">
                {/* MAIN IMAGE AREA */}
                {fileName ? (<div className="w-full h-[233px] relative rounded-[20px]">
                    <img  src={fileName} className="w-full h-full object-cover aspect-auto rounded-[20px]"/>
                    <MdCancel onClick={handleRemoveImage} className='absolute -top-3 -right-4 w-6 h-6 text-red-600 cursor-pointer' />
                </div>) : (


                <div className="flex flex-col gap-2  justify-start items-start w-full">
                    <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-[233px] border-2 border-dashed border-[#544837]/30 rounded-lg cursor-pointer bg-transparent"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <img src={upload} className='w-10 h-10 my-4' />
                        <p className="mb-2 text-sm text-gray-600">
                            <span className="font-semibold text-lg">Add Main Image</span>
                        </p>
                        <p className="text-xs text-gray-500">png, jpeg, jpg,</p>
                        </div>
                        {fileName && (
                        <p className="-mt-2 text-sm text-gray-600 text-ellipsis w-[400px] overflow-hidden">Selected file: {fileName}</p>
                    )}
                        <input  {...register('mainImage')} id="file-upload" accept="png, jpeg, jpg, mov," type="file" className="hidden" onChange={handleFileChange} />
                    </label>  
                    {errors.mainImage && (<p className="mt-1 text-red-500 text-sm">{errors.mainImage.message}</p>)}                                
                </div>
                )}

                <div className='w-full flex flex-col gap-2 '>
                    <label className='text-sm'>Title</label>
                    <input {...register('title')} placeholder='add title...' className='appearance-none w-full h-[46px] rounded-xl border-[1px] border-black/30 p-3 px-8 placeholder:text-black/70 bg-transparent' />
                    {errors.title && (<p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>)}
                </div>

                <div className='w-full flex flex-col gap-2 '>
                    <label className='text-sm'>Author</label>
                    <input {...register('author')} placeholder='author name...' className='appearance-none w-full h-[46px] rounded-xl border-[1px] border-black/30 p-3 px-8 placeholder:text-black/70 bg-transparent' />
                    {errors.author && (<p className="mt-1 text-red-500 text-sm">{errors.author.message}</p>)}
                </div>

               

                <Controller
                    name="tags"
                    control={control}
                    render={({ field, fieldState }) => (
                    <div>
                        <TagsInput
                        value={field.value}
                        onChange={field.onChange}
                        />
                        {fieldState.error && (
                        <div className="mt-1 text-red-500 text-sm">{fieldState.error.message}</div>
                        )}
                    </div>
                    )}
                />


                 <div className='w-full flex flex-col gap-4'>
                    <h1>Blog Content</h1>
                    <RichTextEditor
                    content={formData.description}
                    onChange={(description) => {
                        console.log(description)
                        setFormData({...formData, description})
                    }}
                    placeholder='Type here'
                    />
                 </div>

                 <div className='w-full'>
                    <Button width='100%' type='submit' theme='red' textStyle='text-base p-1 cursor-pointer' text="Publish" />
                 </div>
            </form>
        </div>
  )
}

export default CreateBlogs