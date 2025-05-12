import { Dispatch, SetStateAction, useState } from "react"
import { ViewType } from "./Blogs"
import { useDeleteBlogMutation, useGetAllBlogsQuery } from "@/features/blogs/blogsApiSlice"
import { Button } from "@/components"
import Loader from "@/components/Loader"
import {motion} from 'framer-motion'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { sanitizeDescription } from "@/utils/sanitize";
import { FaArrowRightLong } from "react-icons/fa6";
import EditBlog from "./EditBlog"
import { Blogs } from "@/utils/types"
import ReactPaginate from "react-paginate"


type BlogListProps = {
    action: Dispatch<SetStateAction<ViewType>>
    setID: Dispatch<SetStateAction<string>>
}

const BlogList = ({action, setID}:BlogListProps ) => {
    const [deleteBlog, {isLoading: deletingBlog}] = useDeleteBlogMutation()
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const { data, isLoading } = useGetAllBlogsQuery({ 
        page: currentPage, 
        limit: ITEMS_PER_PAGE 
    });
    const [selectedPost, setSelectedPost] = useState<Blogs>()
    const [openModal, setOpenModal] = useState<boolean>()


    const handleSingleJob = (data: string) => {
        setID(data)
        action(ViewType.SINGLE_BLOG)
    }

    const handleEdit = (data: Blogs) => {
        setSelectedPost(data)
        setOpenModal(true)
    }

    const handleDelete = async (id:string) => {
        try {
          await deleteBlog(id); // Trigger the mutation
          // Optional: Show success message or redirect
        } catch (error) {
          console.error('Failed to delete:', error);
        }
    };

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    console.log(data)
  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col gap-8">
        {(isLoading || deletingBlog) && <Loader />}
        <div className="w-full flex items-center  gap-12">
            <h1 className="text-xl">All Job Posts</h1>
            <div onClick={() => action(ViewType.CREATE_BLOG)}>
                <Button theme='red' textStyle='text-xs p-1 cursor-pointer' text="Create a post" />
            </div>
        </div>

        {data?.posts
  .slice() // Create a copy to avoid mutating the original array
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt)) // Sort by date descending
  .map((post) => (
    <div key={post._id} className="w-2/3 h-[290px] bg-white rounded-lg p-5 flex items-start gap-4 relative">
      {/* Image section */}
      <div className="w-2/4 h-full rounded-lg">
        <img 
          src={post.mainImage} 
          className="w-full h-full aspect-auto object-cover rounded-lg" 
          alt={post.title}
        />
      </div>

      {/* Content section */}
      <div className="w-full flex flex-col gap-3">

        <div className="flex flex-col gap-2">
          <h1 className=" w-2/4 h-[20px] font-semibold overflow-x-hidden text-ellipsis text-nowrap">{post.title}</h1>
          <div className="flex items-center gap-3">
            <p className="text-sm text-black/80 font-semibold">{post.author}</p>
            <span className="text-xs text-black/50">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Content preview */}
        <div className="w-full flex flex-col gap-2">
            <div 
            className="text-sm text-black/90 w-full job-description blog-view"
            dangerouslySetInnerHTML={{ __html: sanitizeDescription(post.content) }}
            />

            <motion.button
                onClick={() => handleSingleJob(post._id)}
                whileHover={{
                // boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                transition: { type: 'spring', stiffness: 300, damping: 15, duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="appearance-none w-[110px] h-[43px] flex items-center justify-start gap-2 underline text-xs text-black rounded-full font-bold"
            >
                Read more 
                <FaArrowRightLong className="text-md" />
            </motion.button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-3 right-5 flex items-center gap-4">
          <MdDelete  title="delete" onClick={() => handleDelete(post._id)}  className="text-red-500 w-6 h-6 cursor-pointer" />
          <CiEdit title="edit" onClick={() => handleEdit(post)} className="text-black w-6 h-6 cursor-pointer" />
      </div>
    </div>
))}

                        {/* Pagination Component */}
                        {data && (
                            <ReactPaginate
                                previousLabel="← Previous"
                                nextLabel="Next →"
                                pageCount={Math.ceil(data.count / ITEMS_PER_PAGE)}
                                onPageChange={handlePageClick}
                                forcePage={currentPage - 1}
                                containerClassName="pagination"
                                previousLinkClassName="pagination__link"
                                nextLinkClassName="pagination__link"
                                disabledClassName="pagination__link--disabled"
                                activeClassName="pagination__link--active"
                                pageClassName="pagination__item"
                                pageLinkClassName="pagination__link"
                            />
                        )}


        {openModal && (
            <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/70 py-10">
                <EditBlog action={setOpenModal} currentPost={selectedPost} />
            </div>
        )}
    </div>
  )
}

export default BlogList