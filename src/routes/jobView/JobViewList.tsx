import Loader from "@/components/Loader";
import { useGetAllJobsQuery } from "@/features/jobs/jobsApiSlice";
import { sanitizeDescription } from "@/utils/sanitize";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { ViewType } from "./JobView";

type JobListProps = {
    action: Dispatch<SetStateAction<ViewType>>
    setID: Dispatch<SetStateAction<string>>
}

const JobViewList = ({action, setID}: JobListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const { data:jobData, isLoading } = useGetAllJobsQuery({ 
      page: currentPage, 
      limit: ITEMS_PER_PAGE 
  });
  
  const handlePageClick = ({ selected }: { selected: number }) => {
      setCurrentPage(selected + 1);
  };

    const handleSingleJob = (data: string) => {
          setID(data)
          action(ViewType.SINGLE_JOB)
    };
  
  
    return (
      <div className="h-full w-full py-10 lg:px-8 overflow-x-hidden">
        {isLoading && <Loader />}
          <div className="w-full">
            {jobData?.jobs.map(job => (
            <div key={job._id} className="lg:w-4/5 h-[301px] bg-white shadow-lg rounded-lg p-5 flex flex-col gap-5 justify-between my-12">
                <h1 className="font-semibold text-xl"> {job.title}</h1>
                <div className="flex items-center gap-3">
                    <span className="p-2 border-[1px] border-black rounded-full text-xs">{job.workLocation}</span>
                    <span className="p-2 border-[1px] border-black rounded-full text-xs">{job.jobType}</span>
                </div>
  
  
                <div className="text-sm text-black/90 w-full job-description job-view" dangerouslySetInnerHTML={{__html: sanitizeDescription(job.description)}}/>
  
                <div className="w-full lg:place-items-end">
                <motion.button
                 onClick={() => handleSingleJob(job._id)}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                        transition: { type: 'spring', stiffness: 300, damping: 15, duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="appearance-none w-[130px] h-[43px] flex items-center justify-center gap-2 bg-black text-xs text-white rounded-full p-1">
                        View more 
                        <FaArrowRightLong className="text-lg" />
                    </motion.button>
                </div>
             </div>
            ))}
  
               {/* Pagination Component */}
               {jobData && (
                    <ReactPaginate
                        previousLabel="← Previous"
                        nextLabel="Next →"
                        pageCount={Math.ceil(jobData.count / ITEMS_PER_PAGE)}
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
        </div>
    )
}

export default JobViewList