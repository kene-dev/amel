import { Button } from "@/components"
import { TagsInput } from "@/components/TagsInput"
import { editBlogSchema } from "@/utils/schema";
import { Blogs } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import upload from '@/assets/svgs/upload.svg'
import { MdCancel } from 'react-icons/md';
import { z } from "zod";
import { RichTextEditor } from "@/components/RichTextEditor";
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
import { useEditBlogMutation } from "@/features/blogs/blogsApiSlice";
import Loader from "@/components/Loader";

type EditBlogProps = {
    action: Dispatch<SetStateAction<boolean | undefined>>,
    currentPost?: Blogs
}

type editBlogTypeInput = z.infer<typeof editBlogSchema>;


type BlogFormData = {
    description: string | undefined
}

const EditBlog = ({ action, currentPost}: EditBlogProps) => {
    const [editBlog] = useEditBlogMutation()
    const [fileName, setFileName] = useState<any>(currentPost?.mainImage);
    const [formData, setFormData] = useState<BlogFormData>({
        description: currentPost?.content,
    })

    const {register, control, handleSubmit, setValue, reset, formState:{errors, isSubmitting} } = useForm<editBlogTypeInput>({
        resolver: zodResolver(editBlogSchema),
        defaultValues: {
            title: currentPost?.title,
            mainImage: currentPost?.mainImage,
            author: currentPost?.author,
            tags: currentPost?.tags
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

    const formSubmit: SubmitHandler<editBlogTypeInput> = async (data) => {
            if(data.mainImage instanceof File){
            console.log("it a file")
            const newImage = await cloudinaryUpload(data.mainImage)
            const newData = {...data, content: formData.description, mainImage:newImage}
            console.log(data)
            try {
            const response = await editBlog({data:newData, id:currentPost?._id}).unwrap();
            if(response){
                reset()
                action(false)
            }
        } catch (error) {
            console.log("ERROR FOR CREATE JOB ", error)
        }}else{ 
            const newData = {...data, content: formData.description}
            try {
                const response = await editBlog({data:newData, id:currentPost?._id}).unwrap();
                if(response){
                    reset()
                    action(false)
                }
            } catch (error) {
                console.log("ERROR FOR CREATE JOB ", error)
            }
        }
    }
        


  return (
    <form onSubmit={handleSubmit(formSubmit)} className="w-3/5 h-[97%] overflow-y-scroll flex flex-col gap-7 bg-white rounded-md p-8">
            {isSubmitting && <Loader />}

            <div className="place-self-end" onClick={() => action(false)}>
                <Button theme='red' textStyle='text-xs p-1 cursor-pointer' text="Cancel" />
            </div>

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
            )
            }

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
                        setFormData({...formData, description})
                    }}
                    />
                 </div>

                 <div className='w-full'>
                    <Button width='100%' type='submit' theme='red' textStyle='text-base p-1 cursor-pointer' text="Publish" />
                 </div>
            </form>
  )
}

export default EditBlog