import { FaArrowRightLong } from "react-icons/fa6";
import {motion} from 'framer-motion'
import { Button } from "@/components";
import { Dispatch, SetStateAction, useState } from "react";
import { ViewType } from "./Jobs";
import { useDeleteJobMutation, useGetAllJobsQuery } from "@/features/jobs/jobsApiSlice";
import { sanitizeDescription } from "@/utils/sanitize";
import Loader from "@/components/Loader";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Jobs } from "@/utils/types";
import EditJob from "./EditJob";
import ReactPaginate from 'react-paginate'


type JobListProps = {
    action: Dispatch<SetStateAction<ViewType>>
    setID: Dispatch<SetStateAction<string>>
}

const JobList: React.FC<JobListProps> = ({action, setID}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const { data, isLoading } = useGetAllJobsQuery({ 
        page: currentPage, 
        limit: ITEMS_PER_PAGE 
    });
     const [selectedJob, setSelectedJob] = useState<Jobs>()
     const [openModal, setOpenModal] = useState<boolean>()
    const [deleteJob, { isLoading:deletingJob }] = useDeleteJobMutation();


    const handleDelete = async (id:string) => {
        try {
          await deleteJob(id); // Trigger the mutation
          // Optional: Show success message or redirect
        } catch (error) {
          console.error('Failed to delete:', error);
        }
    };

    const handleEdit = (data: Jobs) => {
    setSelectedJob(data)
    setOpenModal(true)
    }

    const handleSingleJob = (data: string) => {
    setID(data)
    action(ViewType.SINGLE_JOB)
    }

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    console.log(data)
  return (
  <div className="w-full h-screen overflow-y-scroll flex flex-col gap-8">
     {(isLoading || deletingJob) && <Loader />}
    <div className="w-full flex items-center  gap-12">
        <h1 className="text-xl">All Job Posts</h1>
        <div onClick={() => action(ViewType.POST_JOB)}>
            <Button theme='red' textStyle='text-xs p-1 cursor-pointer' text="Post a Job" />
        </div>
    </div>

    {data?.jobs.map((job) => (
        <div key={job._id} className="w-2/3 h-[301px] bg-white rounded-lg p-5 flex flex-col gap-5 items-start justify-center relative">
            <h1 className="font-semibold text-xl">{job.title} </h1>
            <div className="flex items-center gap-3">
                <span className="p-2 border-[1px] border-black rounded-full text-xs">{job.workLocation}</span>
                <span className="p-2 border-[1px] border-black rounded-full text-xs">{job.jobType}</span>
            </div>
        
            <div className="text-sm text-black/90 w-full job-description line-clamp-3" dangerouslySetInnerHTML={{__html: sanitizeDescription(job.description)}}/>
        
            <div className="w-full place-items-end">
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
            <div className="absolute top-3 right-5 flex items-center gap-4">
                <div className="flex items-center justify-center gap-3  p-2 bg-red-500 text-white rounded-lg">
                    Delete
                    <MdDelete onClick={() => handleDelete(job._id)} className=" text-white w-6 h-6" />
                </div>
                <div title="Edit" aria-label="Edit job post" onClick={() => handleEdit(job)} className="flex items-center justify-center gap-3 p-2 bg-black text-white rounded-lg cursor-pointer">
                    Edit
                    <CiEdit   className="text-white w-6 h-6"  />
                </div>
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
            <EditJob action={setOpenModal} currentJob={selectedJob} />
        </div>
    )}
   </div>
  )
}

export default JobList