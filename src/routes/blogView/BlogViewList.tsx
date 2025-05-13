import Loader from "@/components/Loader";
import { useGetAllBlogsQuery } from "@/features/blogs/blogsApiSlice"
import { sanitizeDescription } from "@/utils/sanitize";
import { useState } from "react";
import { SiOpenbadges } from "react-icons/si";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";


const BlogViewList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const { data, isLoading } = useGetAllBlogsQuery({ 
        page: currentPage, 
        limit: ITEMS_PER_PAGE 
    });
    const content = data && data.posts[0].content
    const date = data && new Date(data.posts[0].createdAt).toLocaleDateString()

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

console.log(data)
  return (
    <div className="w-full h-full flex flex-col gap-10 py-10 bg-gray-100">
        {isLoading && <Loader />}
        <div className="lg:w-[80%] w-full mx-auto px-5">
            
            <div className="lg:w-full lg:h-[500px] flex flex-col-reverse lg:flex-row items-center justify-center gap-5 bg-white rounded-md shadow-lg p-4">
            
                <div className="w-full flex flex-col gap-10 ">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-semibold text-black/80">{data?.posts[0].title}</h1>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <SiOpenbadges className='text-[#DB4444] lg:text-sm text-sm' /> 
                                <p className="lg:text-sm text-sm text-[#121212]">{data?.posts[0].author}</p>
                            </div>
                            <p className="lg:text-xs text-sm text-[#12121296]">{date}</p>
                        </div>

                        <div className='w-full flex items-center gap-2 flex-wrap'>
                            {data?.posts[0].tags.slice(0,3).map(tag => ( 
                             <p className="p-1 bg-black/40 text-white w-max text-xs rounded-md px-7">{tag}</p>
                            ))}
                        </div>
                    </div>

                    <div 
                        className="text-sm text-[#12121299] w-3/4 job-description line-clamp-5 "
                        dangerouslySetInnerHTML={{ __html: sanitizeDescription(content as string) }}
                    />
                     <Link to={`/blog-view/${data?.posts[0]._id}`} className="w-max p-3 px-9 text-sm rounded-md text-white bg-[#DB4444]">
                         Read More
                    </Link>
                </div>

                <div className="w-full h-full">
                    <img src={data?.posts[0].mainImage} className="w-full h-full object-cover" />
                </div>
                
            </div>
        </div>

        <div className="lg:w-[80%] w-full h-full mx-auto flex flex-col lg:flex-row flex-wrap item-start justify-around lg:gap-20 gap-10 p-4">
            {data && data.posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(post => (
                <Link to={`/blog-view/${post._id}`}>
                    <div key={post._id} className="lg:w-[300px] w-full lg:h-[350px] h-max flex flex-col justify-around gap-2 rounded-xl bg-white relative p-3">
                        <div className="h-[170px] w-full ">
                            <img src={post.mainImage} className="w-full h-full object-cover rounded-t-xl" />  
                        </div>

                        <div className="flex flex-col gap-1">
                            <h1 className="text-base lg:text-sm font-semibold w-4/5 line-clamp-2">{post.title}</h1>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                <SiOpenbadges className='text-[#DB4444] lg:text-sm text-sm' /> 
                                <p className="lg:text-xs text-sm text-[#121212]">{post.author}</p>
                                </div>
                                <p className="lg:text-xs text-sm text-[#12121299]">{new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center gap-2 flex-wrap'>
                            {post.tags.slice(0,3).map(tag => ( 
                             <p className="p-1 bg-black/40 text-white w-max text-xs rounded-md px-3">{tag}</p>
                            ))}
                        </div>

                        <Link to={`/blog-view/${post._id}`} className=" w-max p-3 px-9 text-xs rounded-md text-white bg-[#DB4444]">
                         Read More
                        </Link>
                    </div>  
                </Link>
            ))}
        </div>

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
    </div>
  )
}

export default BlogViewList